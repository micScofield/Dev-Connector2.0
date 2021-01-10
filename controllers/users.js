const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const HttpError = require('../models/http-error')

const Signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //return next(new HttpError('Invalid data passed.', 422))
        return res.status(422).json({errors: errors.array()})
    }

    //check if user exists
    const { name, email, password } = req.body

    let user
    try {
        user = await User.findOne({ email: email })
        if (user) {
            //return next(new HttpError('Email exists', 400))
            return res.status(400).json({msg: 'Email Exists'})
        }
    } catch (error) {
        return next(new HttpError('Error while looking up to the db', 500))
    }

    //fetching avatar
    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'})

    //encrypt the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({
        name,
        email,
        password: hashedPassword,
        avatar
    })

    try {
        await user.save()
    } catch (error) {
        return next(new HttpError('Error while saving', 500))
    }

    //create a token
    const payload = {
        user: {
            id: user.id //mongoose abstracts _id from mongo DB to id
        }
    }

    jwt.sign(
        payload, 
        config.get('jwt_secret_key'), 
        {expiresIn: '1h'}, 
        (error, token) => {
        if(error) {
            return next(new HttpError('Couldnt create the token', 500))
        }
        res.json({token: token})
    })
}

exports.Signup = Signup