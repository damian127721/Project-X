const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../schemas/User");
const asyncHandler = require("express-async-handler");
const { uploadImage, deleteImage } = require("../uploadImage");

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
        $and: [
          { _id: { $ne: req.body.user } },
          {
            $or: [
              { email: { $regex: searchValue, $options: "i" } },
              { username: { $regex: searchValue, $options: "i" } },
            ],
          },
        ],
      }).select("-password");
    } catch {
      throw new Error("Error occured");
    }

    res.json(searchedUsers);
  })
);

router.get(
  "/searchSpecific",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
      throw new Error("No email provided");
    }

    try {
      const user = await User.findOne({ email }).select("-password");
      if (!user) {
        throw new Error("Couldn't find");
      }
      res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  })
);

router.post(
  "/updateBio",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user, bio } = req.body;
    try {
      await User.findOneAndUpdate({ _id: user._id }, { bio });
      res.status(200).send();
    } catch (error) {
      throw new Error(error);
    }
  })
);

router.post(
  "/uploadImage",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { image, user } = req.body;
    if (!image) return res.status(400).send();
    if (user.pic.src) {
      await deleteImage(user.pic.cloudId);
    }
    uploadImage(image)
      .then(async (pic) => {
        await User.findOneAndUpdate({ _id: user._id }, { pic });
        res.send(pic);
      })
      .catch((err) => res.status(500).send(err));
  })
);

module.exports = router;
