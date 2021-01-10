const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async (req, res, next) => {
    try {
        await mongoose.connect(
            db, 
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, 
            console.log('db connected')
        )
    } catch (error) {
        console.log('Connection to DB failed')
    }
}

module.exports = connectDB