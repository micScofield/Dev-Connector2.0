import axios from 'axios'

import * as actionTypes from './types'
import { setAuthToken } from '../../utility/setAuthToken'
import { setAlert } from './alert'
import { logout } from './index'

const fetchProfileStart = () => { return { type: actionTypes.FETCH_PROFILE_START } }
const loadCurrentProfileSuccess = (profile) => { return { type: actionTypes.LOAD_CURRENT_PROFILE_SUCCESS, profile: profile } }
const loadAllProfilesSuccess = (profiles) => { return { type: actionTypes.LOAD_ALL_PROFILES_SUCCESS, profiles: profiles } }
const loadRepos = (repos) => { return { type: actionTypes.LOAD_REPOS, repos: repos } }
const profileError = () => { return { type: actionTypes.PROFILE_ERROR } }

export const currentProfile = () => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.get('http://localhost:5000/api/profiles/me')
        let res = await axios.get('/api/profiles/me')
        console.log('profile exists')
        dispatch(loadCurrentProfileSuccess(res.data.profile))
    } catch (error) {
        console.log(error)
        dispatch(profileError())
        if (error.response.data.msg) dispatch(setAlert('danger', error.response.data.msg))
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    dispatch(fetchProfileStart())

    console.log(typeof (formData))
    console.log(formData)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        //console.log('sending data', formData)
        // let res = await axios.post('http://localhost:5000/api/profiles', JSON.stringify(formData), config)
        let res = await axios.post('/api/profiles', JSON.stringify(formData), config)

        if (res.status === 200) dispatch(setAlert('success', edit ? 'Profile updated successfully !' : 'Profile created successfully !'))

        dispatch(loadCurrentProfileSuccess(res.data.profile))
        history.push('/dashboard')
    } catch (error) {
        dispatch(profileError())
        console.log(error.response.data.errors)
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}

//clearing out profile
export const clearProfile = () => { return { type: actionTypes.CLEAR_PROFILE } }

//adding an experience
export const addExperience = (formData, history) => async dispatch => {
    dispatch(fetchProfileStart()) //starts loading spinner

    console.log(formData)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.put('http://localhost:5000/api/profiles/experience', JSON.stringify(formData), config)
        let res = await axios.put('/api/profiles/experience', JSON.stringify(formData), config)

        if (res.status === 200) dispatch(setAlert('success', 'Experience added successfully !'))

        dispatch(loadCurrentProfileSuccess(res.data.profile))
        history.push('/dashboard')
    } catch (error) {
        dispatch(profileError())
        console.log(error)
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}

//adding an education
export const addEducation = (formData, history) => async dispatch => {
    dispatch(fetchProfileStart()) //starts loading spinner

    console.log(formData)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.put('http://localhost:5000/api/profiles/education', JSON.stringify(formData), config)
        let res = await axios.put('/api/profiles/education', JSON.stringify(formData), config)

        if (res.status === 200) dispatch(setAlert('success', 'Education added successfully !'))

        dispatch(loadCurrentProfileSuccess(res.data.profile))
        history.push('/dashboard')
    } catch (error) {
        dispatch(profileError())
        console.log(error)
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}


//delete actions
//delete experience

export const deleteExperience = (expId) => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.delete(`http://localhost:5000/api/profiles/experience/${expId}`)
        let res = await axios.delete(`/api/profiles/experience/${expId}`)

        if (res.status === 200) dispatch(setAlert('success', 'Experience deleted successfully !'))

        dispatch(loadCurrentProfileSuccess(res.data.profile))
    } catch (error) {
        dispatch(profileError())
        console.log(error)
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}

//delete education
export const deleteEducation = (eduId) => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.delete(`http://localhost:5000/api/profiles/education/${eduId}`)
        let res = await axios.delete(`/api/profiles/education/${eduId}`)

        if (res.status === 200) dispatch(setAlert('success', 'Education deleted successfully !'))

        dispatch(loadCurrentProfileSuccess(res.data.profile))
    } catch (error) {
        dispatch(profileError())
        console.log(error)
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}

//delete account/profile
export const deleteAccount = (history) => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.delete('http://localhost:5000/api/profiles')
        let res = await axios.delete('/api/profiles')

        dispatch(logout())
        if (res.status === 200) dispatch(setAlert('success', 'Account deleted successfully'))

        history.push('/')
    } catch (error) {
        dispatch(profileError())
        console.log(error)
        if (error.response) {
            error.response.data.errors.forEach(error => {
                dispatch(setAlert('danger', error.msg))
            });
        }
        console.log('some unknown error occurred !')
    }
}

//get github repositories
export const getGithubRepos = (username) => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        setAuthToken(localStorage.getItem('token'))
        // let res = await axios.get(`http://localhost:5000/api/profiles/github/${username}`)
        let res = await axios.get(`/api/profiles/github/${username}`)
        console.log(res)
        dispatch(loadRepos(res.data))
    } catch (error) {
        dispatch(profileError())
        console.log(error.response)
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch(fetchProfileStart())

    try {
        // let res = await axios.get('http://localhost:5000/api/profiles')
        let res = await axios.get('/api/profiles')
        dispatch(loadAllProfilesSuccess(res.data.profiles))
    } catch (error) {
        dispatch(profileError())
        dispatch(setAlert('danger', 'some unknown error occurred !'))
    }
}

//get profile by userid
export const getProfileBUserId = userId => async dispatch => {
    dispatch(fetchProfileStart())
    dispatch(clearProfile())
    dispatch(fetchProfileStart())
    try {
        // let res = await axios.get(`http://localhost:5000/api/profiles/user/${userId}`)
        let res = await axios.get(`/api/profiles/user/${userId}`)
        dispatch(loadCurrentProfileSuccess(res.data.profile))
    } catch (error) {
        dispatch(profileError())
        dispatch(setAlert('danger', 'some unknown error occurred !'))
    }
}
