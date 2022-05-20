const mongoose = require('mongoose')
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter your first name"],
        maxLength: [15, "Your first name must not exceed 15 characters"],
        minLength: [3, "Your first name must at least be 3 characters"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter your last name"],
        maxLength: [15, "Your last name must not exceed 15 characters"],
        minLength: [3, "Your last name must at least be 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        require: [true, "Please enter a password"],
        minLength: [8, "The password must be greater than 8 characters"],
        select: false,
    },
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: true,
    //     },
    //     url: {
    //         type: String,
    //         required: true,
    //     },
    // },
    // role: {
    //     type: String,
    //     default: "user",
    // }
})

const user = mongoose.model('User', userSchema)

module.exports = user