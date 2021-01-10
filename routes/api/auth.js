const express = require('express')
const { check } = require('express-validator')

//middleware
const auth = require('../../middlewares/auth')

//controller
const AuthController = require('../../controllers/auth')

const router = express.Router()

//get user by id  @access=private
router.get('/', auth, AuthController.Auth)

//login  @access=public
router.post(
    '/', 
    [
        check('email', 'Email is required').notEmpty().normalizeEmail().isEmail(),
        check('password', 'Password is required').notEmpty()
    ],
    AuthController.Login)

module.exports = router