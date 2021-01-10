import axios from 'axios'

import * as actionTypes from './types'
import { setAlert, clearProfile } from './index'
import { setAuthToken } from '../../utility/setAuthToken'


//for login/signup
const authStart = () => { return { type: actionTypes.AUTH_START } }
const authSuccess = () => { return { type: actionTypes.AUTH_SUCCESS } }
const authFailure = () => { return { type: actionTypes.AUTH_FAILURE } }

//for setting auth token with request
const authInvalidToken = () => { return { type: actionTypes.AUTH_INVALID_TOKEN } }
const loadUserSuccess = (user) => {
    return {
        type: actionTypes.LOAD_USER_SUCCESS,
        user: user
    }
}

//logout
export const authLogout = () => { return { type: actionTypes.LOGOUT } }

export const auth = (name, email, password) => async dispatch => {
    dispatch(authStart())

    try {
        let res = await axios.post(
            // 'http://localhost:5000/api/users/',
            '/api/users/',
            JSON.stringify({ name, email, password }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        localStorage.setItem('token', res.data.token)
        dispatch(authSuccess())
        dispatch(loadUser())
    } catch (error) {
        dispatch(authFailure())
        dispatch(setAlert('danger', error.response.data.msg))
    }
}

export const login = (email, password) => async dispatch => {
    dispatch(authStart())

    try {
        let res = await axios.post(
            // 'http://localhost:5000/api/auth/',
            '/api/auth/',
            JSON.stringify({ email, password }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        localStorage.setItem('token', res.data.token)
        dispatch(authSuccess())
        dispatch(loadUser())
    } catch (error) {
        dispatch(authFailure())
        console.log(error.response.data.msg)
        dispatch(setAlert('danger', error.response.data.msg))
    }
}

export const loadUser = () => async dispatch => {
    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.get('http://localhost:5000/api/auth/')
        let res = await axios.get('/api/auth/')
        dispatch(loadUserSuccess(res.data.user))
    } catch (error) {
        dispatch(authInvalidToken())
        if (error.response) console.log(error.response.data.msg) //show a modal to user with this error and provide a login button
    }
}

export const logout = () => async dispatch => {
    localStorage.removeItem('token')
    dispatch(clearProfile())
    dispatch(authLogout())
}