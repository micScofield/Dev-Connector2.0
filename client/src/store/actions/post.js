import axios from 'axios'

import * as actionTypes from './types'
import { setAuthToken } from '../../utility/setAuthToken'
import { setAlert } from './alert'

const postsStart = () => ({ type: actionTypes.LOAD_POSTS_START })
const postsError = error => ({ type: actionTypes.POSTS_ERROR, error: error })
const storePosts = posts => ({ type: actionTypes.LOAD_POSTS, posts: posts })
const storePost = post => ({ type: actionTypes.LOAD_POST, post: post })
const updateLikes = (id, likes) => ({ type: actionTypes.UPDATE_LIKES, id: id, likes: likes })
const updateComments = (id, comments) => ({ type: actionTypes.UPDATE_COMMENTS, id: id, comments: comments })

export const loadPosts = () => async dispatch => {
    dispatch(postsStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // const res = await axios.get('http://localhost:5000/api/posts')
        const res = await axios.get('/api/posts')
        console.log(res.data)
        dispatch(storePosts(res.data))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

export const addPost = (text) => async dispatch => {
    dispatch(postsStart())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        // await axios.post('http://localhost:5000/api/posts', text, config)
        await axios.post('/api/posts', text, config)
        dispatch(loadPosts())
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

//Like a post
export const addLike = (id) => async dispatch => {
    try {
        setAuthToken(localStorage.getItem('token'))
        // const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`)
        const res = await axios.put(`/api/posts/like/${id}`)
        console.log(res.data)
        dispatch(updateLikes(id, res.data))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

//remove your like
export const removeLike = (id) => async dispatch => {
    try {
        setAuthToken(localStorage.getItem('token'))
        // const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`)
        const res = await axios.put(`/api/posts/unlike/${id}`)
        console.log(res.data)
        dispatch(updateLikes(id, res.data))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

//delete post
export const deletePost = (id) => async dispatch => {
    try {
        setAuthToken(localStorage.getItem('token'))
        // await axios.delete(`http://localhost:5000/api/posts/${id}`)
        await axios.delete(`/api/posts/${id}`)
        dispatch(loadPosts())
        dispatch(setAlert('success', 'Post removed !'))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

//get post by id
export const loadPost = id => async dispatch => {
    dispatch(postsStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
        const res = await axios.get(`/api/posts/${id}`)
        console.log(res.data)
        dispatch(storePost(res.data))
    } catch (error) {
        console.log(error, error.response)
        error.response && dispatch(postsError(error.response.data.message))
    }
}

//Add comment
export const addComment = (id, text) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        // const res = await axios.put(`http://localhost:5000/api/posts/${id}/comment`, text, config)
        const res = await axios.put(`/api/posts/${id}/comment`, text, config)
        console.log(res.data)
        dispatch(updateComments(id, res.data))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}

//Remove comment
export const deleteComment = (id, commentId) => async dispatch => {
    try {
        setAuthToken(localStorage.getItem('token'))
        // const res = await axios.delete(`http://localhost:5000/api/posts/${id}/deleteComment/${commentId}`)
        const res = await axios.delete(`/api/posts/${id}/deleteComment/${commentId}`)
        console.log(res.data)
        dispatch(updateComments(id, res.data))
        dispatch(setAlert('success', 'Comment removed !'))
    } catch (error) {
        console.log(error, error.response)
        dispatch(postsError(error.response.data.msg))
    }
}