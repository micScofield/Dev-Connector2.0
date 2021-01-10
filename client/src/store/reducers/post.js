import * as actionTypes from '../actions/types'

const initialState = {
    loading: false,
    posts: [],
    post: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_POSTS_START: return { ...state, loading: true, posts: [], error: null }
        case actionTypes.LOAD_POSTS: return { ...state, loading: false, posts: action.posts }
        case actionTypes.LOAD_POST: return { ...state, loading: false, post: action.post }
        case actionTypes.UPDATE_LIKES: return { ...state, loading: false, posts: state.posts.map((post) =>
            post._id === action.id ? { ...post, likes: action.likes } : post
          ), }
        case actionTypes.UPDATE_COMMENTS: return { ...state, loading: false, post: { ...state.post, comments: action.comments }}
        case actionTypes.POSTS_ERROR: return { ...state, loading: false, error: action.error }
        default: return state
    }
}

export default reducer