const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../schemas/User");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.get(
  "/search",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { searchValue } = req.query;
    let searchedUsers = {};

    if (!searchValue) {
      res.status(400);
      throw new Error("Enter a value");
    }

    try {
      searchedUsers = await User.find({
        $or: [
          { email: { $regex: searchValue, $options: "i" } },
          { username: { $regex: searchValue, $options: "i" } },
        ],
      }).select("-password");
    } catch {
      throw new Error("Error occured");
    }

    res.json(searchedUsers);
  })
);

module.exports = router;
