const asyncHandler = require("express-async-handler")
const express = require("express")
const User = require("../schemas/User")

module.exports.registerController = async (req, res) => {
    const {email, password, username} = req.body

    await User.create({email, password, username})
    res.status(200).send("Success")
}