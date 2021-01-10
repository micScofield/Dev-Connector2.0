import * as actiontypes from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: false,
    repos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.FETCH_PROFILE_START:
            return { ...state, loading: true, repos: [] }
        case actiontypes.LOAD_CURRENT_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.profile }
        case actiontypes.LOAD_ALL_PROFILES_SUCCESS:
            return { ...state, loading: false, profiles: action.profiles }
        case actiontypes.CLEAR_PROFILE:
            return { ...state, profile: null, repos: [] }
        case actiontypes.PROFILE_ERROR:
            return { ...state, loading: false, repos: [] }
        case actiontypes.LOAD_REPOS:
            return { ...state, loading: false, repos: action.repos }
        default:
            return state
    }
}

export default reducer