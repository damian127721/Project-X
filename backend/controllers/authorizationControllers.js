const asyncHandler = require("express-async-handler")
const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../schemas/User")
const generateToken = require("../generateToken")

module.exports.registerController = asyncHandler(async (req, res) => {
    const {email, password, username} = req.body

    if (!email || !password || !username) {
        res.status(400)
        throw new Error("Some properties are missing")
    }

    if(await User.findOne({email})) {
        res.status(400)
        throw new Error("User already registered")
    }

    const user = await User.create({email, password, username})

    if (user) {
        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(500).send("Couldn't create user")
    }
    
})

module.exports.loginController = asyncHandler(async (req, res) => {
    const {password, email} = req.body

    if (!password || !email) {
        res.status(400)
        throw new Error("User already registered")
    }

    const user = await User.findOne({email})

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            email: user.email,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Wrong email or password")
    }
})