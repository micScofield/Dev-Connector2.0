const express = require('express')
const { check } = require('express-validator')

const auth = require('../../middlewares/auth')
const PostController = require('../../controllers/posts')

const router = express.Router()

//post a new post  @access=private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Please enter some text').notEmpty(),
        ]
    ],
    PostController.AddPost)

// get all posts  @access=private
router.get('/', auth, PostController.GetPosts)

//get post by ID  @access=private
router.get('/:postId', auth, PostController.GetPostById)

//delete post by ID  @access=private
router.delete('/:postId', auth, PostController.DeletePostById)

//put like a post  @access=private
router.put('/like/:postId', auth, PostController.LikePost)

//put unlike a post  @access=private
router.put('/unlike/:postId', auth, PostController.UnlikePost)

//put comment on a post  @access=private
router.put(
    '/:postId/comment', 
    [
        auth,
        [
            check('text', 'Please enter some text inside comment.').notEmpty()
        ]
    ], 
    PostController.MakeCommentOnPost)

//delete remove comment off a post  @access=private
router.delete('/:postId/deleteComment/:commentId', auth, PostController.DeleteCommentFromPostById)

module.exports = router