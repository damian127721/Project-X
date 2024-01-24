const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../schemas/Message");
const Chat = require("../schemas/Chat");

router.post(
  "/sendMessage",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { text, user, chatId } = req.body;

    try {
      const message = await Message.create({ sender: user.username, text });

      const chat = await Chat.updateOne(
        { _id: chatId },
        {
          $push: {
            messages: message,
          },
        }
      );
      res.json({ sendSuccessfull: true });
    } catch (error) {
      throw new Error(error);
    }
  })
);

router.get(
  "/getChatMessages",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { chatId } = req.query;

    const chat = await Chat.find({ _id: chatId }).populate("messages");

    res.json(chat);
  })
);

module.exports = router;
