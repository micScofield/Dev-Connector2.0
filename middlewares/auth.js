const jwt = require('jsonwebtoken')
// const config = require('config')
require('dotenv').config()

const HttpError = require('../models/http-error')

module.exports = async (req, res, next) => {

    //pass on this type of request as browser sometimes sends it before sending the actual post/get request
    if (req.method === 'OPTIONS') {
        return next()
    }

    //get the token from header from request made at this API
    const token = req.header('x-auth-token')

    //check whether token present or not
    if (!token) {
        return res.status(401).json({msg: 'Token is not present. Please login again !'})
    }

    let decodedToken
    try {
        // decodedToken = jwt.verify(token, config.get('jwt_secret_key'))
        decodedToken = jwt.verify(token, process.env.jwtSecretKey)
        req.user = decodedToken.user
        next()
    } catch (error) {
        //return next(new HttpError('Token is not valid', 401))
        return res.status(401).json({msg: 'Token is not valid. Please login again !'})
    }
}