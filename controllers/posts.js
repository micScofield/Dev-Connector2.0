const { get } = require('config')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Post = require('../models/Post')
const User = require('../models/User')

const addPost = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let user
    try {
        user = await User.findById(req.user.id).select('-password')
    } catch (error) {
        return next(new HttpError('Error while looking up in the db', 500))
    }

    if (!user) return next(new HttpError('User not found in the db', 500))

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
    })

    const post = await newPost.save()

    res.status(201).json(post)
}

const getPosts = async (req, res, next) => {
    let posts
    try {
        posts = await Post.find().sort({ date: -1 })
    } catch (error) {
        return res.status(500).json({msg: 'Error while looking up in the db'})
    }

    if (!posts) return res.status(404).json({msg: 'No posts found'})

    res.json(posts)
}

const getPostById = async (req, res, next) => {
    const postId = req.params.postId
    let post
    try {
        post = await Post.findById(postId)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No post found with provided id', 404))
        }
        return next(new HttpError('Error while looking up in the db', 500))
    }
    if (!post) return next(new HttpError('No post found with provided id', 404))

    res.json(post)
}

const deletePostById = async (req, res, next) => {
    const postId = req.params.postId

    let post
    try {
        post = await Post.findById(postId)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No post found for this user', 404))
        }
        return next(new HttpError('Error while looking up in the db', 500))
    }

    if (!post) return next(new HttpError('No post found with provided ID', 500))

    if (post.user.toString() !== req.user.id) {
        return next(new HttpError('You are not authorized to perform this operation', 401))
    }

    await post.remove()
    res.json({ message: 'Post deleted' })
}

const likePost = async (req, res, next) => {
    const postId = req.params.postId
    const userId = req.user.id

    let post
    try {
        post = await Post.findById(postId)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No post found for this user', 404))
        }
        return next(new HttpError('Error while looking up in the db', 500))
    }

    if (!post) return next(new HttpError('No post found with provided ID', 500))

    try {
        const isLiked = post.likes.filter(like => like.user.toString() === userId).length > 0
        if (isLiked) {
            return next(new HttpError('Already liked', 400))
        } else {
            post.likes.unshift({ user: userId })
            await post.save()
        }
    } catch (error) {
        return next(new HttpError('Some error occurred, try again !', 500))
    }

    res.json(post.likes)
}

const unlikePost = async (req, res, next) => {
    const postId = req.params.postId
    const userId = req.user.id

    let post
    try {
        post = await Post.findById(postId)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No post found for this user', 404))
        }
        return next(new HttpError('Error while looking up in the db', 500))
    }

    if (!post) return next(new HttpError('No post found with provided ID', 500))

    try {
        const isLiked = post.likes.filter(like => like.user.toString() === userId).length === 1
        if (isLiked) {
            //console.log('type of userId', typeof(userId))  // --> String
            //console.log('type of user inside array', typeof(post.likes[0].user)) // --> Object. Convert it using toString()

            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(userId)
            post.likes.splice(removeIndex, 1)

            await post.save()
        } else {
            return next(new HttpError('Post hasnt been liked yet', 400))
        }
    } catch (error) {
        return next(new HttpError('Some error occurred, try again !', 500))
    }

    res.json(post.likes)
}

const makeCommentOnPost = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const postId = req.params.postId
    const userId = req.user.id
    const text = req.body.text

    let post
    try {
        post = await Post.findById(postId)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No post found for this user', 404))
        }
        return next(new HttpError('Error while looking up in the db', 500))
    }

    if (!post) return next(new HttpError('No post found with provided ID', 500))

    const user = await User.findById(userId)

    if (!user) { return next(new HttpError('Cant find any user with provided userId')) }

    const commentField = {
        user: userId,
        text,
        name: user.name,
        avatar: user.avatar
    }

    try {
        post.comments.unshift(commentField)
        await post.save()
    } catch (error) {
        return next(new HttpError('Some error occurred, try again !', 500))
    }

    res.json(post.comments)
}

const deleteCommentFromPostById = async (req, res, next) => {
    const postId = req.params.postId
    const commentId = req.params.commentId
    const userId = req.user.id

    //fetch post
    let post
    try {
        post = await Post.findById(postId)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No post found for this user', 404))
        }
        return next(new HttpError('Error while looking up in the db', 500))
    }

    if (!post) return next(new HttpError('No post found with provided ID', 500))

    //fetch comment
    const comment = await post.comments.filter(comment => comment.id === commentId)

    if(comment.length === 0) {return next(new HttpError('Comment not found / already deleted', 400))}

    //authorize user
    if(comment[0].user.toString() !== userId) {
        return next(new HttpError('You are not authorized', 401))
    }

    //fetch index
    const commentIndex = await post.comments.map(comment => comment.id.toString()).indexOf(commentId)
    try {
        post.comments.splice(commentIndex, 1)
        await post.save()
    } catch (error) {
        return next(new HttpError('Some error occurred, try again !', 500))
    }

    res.json(post.comments)
}

exports.AddPost = addPost
exports.GetPosts = getPosts
exports.GetPostById = getPostById
exports.DeletePostById = deletePostById
exports.LikePost = likePost
exports.UnlikePost = unlikePost
exports.MakeCommentOnPost = makeCommentOnPost
exports.DeleteCommentFromPostById = deleteCommentFromPostById