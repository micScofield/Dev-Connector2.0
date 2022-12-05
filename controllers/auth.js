const bcrypt = require('bcryptjs')
// const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
require('dotenv').config()

const User = require('../models/User')
const HttpError = require('../models/http-error')

const auth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({ user: user })
    } catch (error) {
        return next(new HttpError('Error while looking up in the db', 500))
    }
}

const login = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return next(new HttpError('Invalid data passed, please try again !', 422))
        return res.status(422).json({errors: errors.array()})
    }

    const { email, password } = req.body

    //check if user is present already or not
    let user
    try {
        user = await User.findOne({ email: email })
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword) {
                //generate a token
                const payload = {
                    user: {
                        id: user.id //mongoose abstracts _id from mongo DB to id
                    }
                }

                console.log(process.env.jwtSecretKey)
                
                jwt.sign(
                    payload,
                    // config.get('jwt_secret_key'),
                    process.env.jwtSecretKey,
                    { expiresIn: '10h' },
                    (error, token) => {
                        if (error) {
                            return next(new HttpError('Couldnt create the token', 500))
                        }
                        res.json({ token: token })
                    })
            } else {
                //return next(new HttpError('Incorrect password. Please try again', 401))
                return res.status(401).json({msg: 'Incorrect password. Please try again'})
            }
        } else {
            //return next(new HttpError('No user with provided email exists.', 400))
            return res.status(400).json({msg: 'No user with provided email exists.'})
        }
    } catch (error) {
        console.log(error)
        //return next(new HttpError('Server Error', 500))
        return res.status(500).json({msg: 'Server Error. Please try again'})
    }
}

exports.Auth = auth
exports.Login = login