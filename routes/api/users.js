const express = require('express')
const { check } = require('express-validator')

//controllers
const UserController = require('../../controllers/users')

const router = express.Router()

//post/register  @access=public
router.post('/', [
    check('name', 'Please enter name').notEmpty(),
    check('email', 'Please enter email').notEmpty().normalizeEmail().isEmail(),
    check('password', 'Please enter password').notEmpty().isLength({min: 5})
], UserController.Signup)

module.exports = router