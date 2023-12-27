const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("../schemas/User")

dotenv.config()

module.exports = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        throw new Error("Missing token")
    }

    if(token.startsWith("Bearer")) {
        token = token.split(" ")[1]
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
        req.body.user = user
        next()
    } catch(error) {
        res.status(400)
        throw new Error("Invalid token")
    }
})