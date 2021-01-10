const express = require('express')
const { check } = require('express-validator')

const auth = require('../../middlewares/auth')
const ProfileController = require('../../controllers/profiles')

const router = express.Router()

//get current user profile  @access=private
router.get('/me', auth, ProfileController.MyProfile)

//post/create or update user profile @access=private
router.post(
    '/', 
    [
        auth, 
        [
            check('status', 'Status is required').notEmpty(),
            check('skills', 'Skills field is required').notEmpty()
        ]
    ], 
    ProfileController.SetProfile)

//get all profiles  @access=public
router.get('/', ProfileController.GetAllProfiles)

//get profile by user id  @access=public
router.get('/user/:userId', ProfileController.GetProfileByUserId)

//delete delete profile & user  @access=private
router.delete('/', auth, ProfileController.DeleteProfileAndUser)

//put  add profile experience  @access=private
router.put(
    '/experience', 
    [
        auth,
        [
            check('title', 'Please enter title').notEmpty(),
            check('company', 'Please enter a company name').notEmpty(),
            check('from', 'Please enter start date').notEmpty(),
        ]
    ], 
    ProfileController.AddExperience)

//delete experience by id  @access=private
router.delete('/experience/:expId', auth, ProfileController.DeleteExperience)

//put  add profile education  @access=private
router.put(
    '/education', 
    [
        auth,
        [
            check('school', 'Please enter school').notEmpty(),
            check('degree', 'Please enter a degree').notEmpty(),
            check('fieldOfStudy', 'Please enter your fieldOfStudy').notEmpty(),
            check('from', 'Please enter start date').notEmpty(),
        ]
    ], 
    ProfileController.AddEducation)

//delete education by id  @access=private
router.delete('/education/:eduId', auth, ProfileController.DeleteEducation)

//get github repositories by username  @access=public
router.get('/github/:username', ProfileController.GetGithubRepo)

module.exports = router