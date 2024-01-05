const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../schemas/User")
const asyncHandler = require("express-async-handler")

const router = express.Router()

router.post("/search", authMiddleware, asyncHandler(async (req, res) => {
    const {searchValue} = req.body
    let searchedUsers = {}
    
    try {
        searchedUsers = await User.find({
            $or: [
                {email: {$regex: searchValue, $options: "i"}},
                {username: {$regex: searchValue, $options: "i"}}
            ]}
        ).select("-password")
    } catch {
        throw new Error("Error occured")
    }

    res.json(searchedUsers)
}))

module.exports = router