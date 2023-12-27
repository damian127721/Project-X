const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

module.exports = function generateToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}