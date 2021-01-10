const { validationResult } = require('express-validator')
const request = require('request')
const config = require('config')

const HttpError = require('../models/http-error')
const Profile = require('../models/Profile')
const User = require('../models/User')

const myProfile = async (req, res, next) => {

    let profile
    try {
        profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
    } catch (error) {
        return next(new HttpError('Server Error', 500))
    }
    if (!profile) {
        return res.status(404).json({ msg: 'No profile found for this user' })
        //return next(new HttpError('No profile found for this user', 404))
    }

    if (profile) {
        return res.json({ profile: profile })
    }
}

const setProfile = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        // return next(new HttpError('Invalid Data passed', 422))
        return res.status(422).json({ errors: errors.array() })
    }

    //if (typeof(req.body.skills) !== 'string') JSON.stringify(req.body.skills)

    let {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        linkedIn,
        instagram
    } = req.body

    //set profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubUsername = githubusername

    console.log(typeof (company))
    console.log(typeof (skills))
    console.log(typeof (twitter))

    profileFields.skills = skills.split(',').map(skill => skill.trim())

    //set social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram
    if (facebook) profileFields.social.facebook = facebook
    if (linkedIn) profileFields.social.linkedIn = linkedIn

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )

            return res.json({ profile: profile })
        }

        //create
        profile = new Profile(profileFields)
        await profile.save()

        return res.json({ profile: profile })

    } catch (error) {
        console.log('here')
        return next(new HttpError('Error while setting up profile'), 500)
    }
}

const getAllProfiles = async (req, res, next) => {
    let profiles
    try {
        profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json({ profiles: profiles })
    } catch (error) {
        return next(new HttpError('server/DB error', 500))
    }
}

const getProfileByUserId = async (req, res, next) => {

    const userId = req.params.userId

    let profile
    try {
        profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar'])
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return next(new HttpError('No profile found for this user', 404))
        }
        return next(new HttpError('DB error', 500))
    }

    if (!profile) {
        return next(new HttpError('No profile found for this user', 404))
    }

    res.json({ profile: profile })
}

const deleteProfileAndUser = async (req, res, next) => {
    try {
        const profile = await Profile.findOneAndRemove({ user: req.user.id }) //stores document in profile if found
        const user = await User.findOneAndRemove({ _id: req.user.id })

    } catch (error) {
        return next(new HttpError('Error while deleting profile and user', 500))
    }
    res.json({ message: 'Profile and User deleted !' })
}

const addExperience = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        if (!profile) {
            return next(new HttpError('No profile found in the database', 404))
        }

        profile.experience.unshift(newExp)
        await profile.save()

        res.json({ profile: profile })

    } catch (error) {
        //return next(new HttpError('Error while adding experience', 500))
        return res.status(500).json({msg : 'Some server error occurred'})
    }

}

const deleteExperience = async (req, res, next) => {

    const expId = req.params.expId

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        if (!profile) {
            return next(new HttpError('No profile found in the database', 404))
        }

        //approach 1
        //const experience = profile.experience.pull({_id: expId})

        //approach 2: Find index and splice the array
        const removeIndex = profile.experience.map(item => item.id).indexOf(expId)
        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.json({ profile: profile })
    } catch (error) {
        return next(new HttpError('Error while removing experience', 500))
    }
}

const addEducation = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { school, degree, fieldOfStudy, from, to, current, description } = req.body

    console.log(current, typeof(current))
    const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        if (!profile) {
            return next(new HttpError('No profile found in the database', 404))
        }

        profile.education.unshift(newEdu)
        await profile.save()

        res.json({ profile: profile })

    } catch (error) {
        return next(new HttpError('Error while adding education', 500))
    }

}

const deleteEducation = async (req, res, next) => {

    const eduId = req.params.eduId

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        if (!profile) {
            return next(new HttpError('No profile found in the database', 404))
        }

        //Find index and splice the array
        const removeIndex = profile.education.map(item => item.id).indexOf(eduId)
        profile.education.splice(removeIndex, 1)

        await profile.save()

        res.json({ profile: profile })

    } catch (error) {
        return next(new HttpError('Error while removing education', 500))
    }
}

const getGithubRepo = async (req, res, next) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if (error) console.log(error)
            if (response.statusCode !== 200) {
                return next(new HttpError('Cant find a profile for provided username !', 404))
            }
            res.json(JSON.parse(body))
        })

    } catch (error) {
        return res.status(404).json({msg: 'Couldnt fetch user repositories'})
    }
}

exports.MyProfile = myProfile
exports.SetProfile = setProfile
exports.GetAllProfiles = getAllProfiles
exports.GetProfileByUserId = getProfileByUserId
exports.DeleteProfileAndUser = deleteProfileAndUser
exports.AddExperience = addExperience
exports.DeleteExperience = deleteExperience
exports.AddEducation = addEducation
exports.DeleteEducation = deleteEducation
exports.GetGithubRepo = getGithubRepo