import * as actionTypes from '../actions/types'

const initialState = {
    isAuth: false,
    loading: false,
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return { ...state, loading: true, isAuth: false, user: null }

        case actionTypes.AUTH_SUCCESS:
            return { ...state, loading: false, isAuth: true }

        case actionTypes.LOAD_USER_SUCCESS:
            return { ...state, user: action.user, isAuth: true }

        case actionTypes.LOGOUT:
            return {...state, isAuth: false, user: null}

        case actionTypes.AUTH_FAILURE:
        case actionTypes.AUTH_INVALID_TOKEN:
            return { ...state, loading: false }

        default:
            return state
    }
}

export default reducer