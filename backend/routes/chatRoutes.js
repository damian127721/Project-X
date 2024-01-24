const Chat = require("../schemas/Chat");
const router = require("express").Router();
const User = require("../schemas/User");
const Message = require("../schemas/Message");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/createChat",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { name, isGroupChat, users } = req.body;
    if ((isGroupChat && !name) || !users) {
      throw new Error("Some properties are missing.");
    } else if (users.length < 2 || (isGroupChat && users.length < 3)) {
      throw new Error("Not enough users.");
    } else if (!isGroupChat) {
      try {
        const chatExists = await Chat.findOne({ users });
        if (chatExists) {
          return res.status(400).json({ message: "The chat already exists." });
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    try {
      const chat = await Chat.create({ name, isGroupChat, users });

      res.json(chat);
    } catch (error) {
      throw new Error(error);
    }
  })
);

/* router.get(
  "/getChats",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user } = req.body;

    try {
      const userChats = await Chat.find({ users: { $in: [user] } });
      res.json(userChats);
    } catch (error) {
      throw new Error(error);
    }
  })
); */

router.get(
  "/privateChatExists",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user } = req.body;
    const { contactId } = req.query;

    if (!contactId) {
      throw new Error("A user is missing.");
    }

    try {
      const userChat = await Chat.findOne({
        users: [user, contactId],
      }).populate("messages");
      res.json(userChat);
    } catch (error) {
      throw new Error(error);
    }
  })
);

module.exports = router;
