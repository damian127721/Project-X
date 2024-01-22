const Chat = require("../schemas/Chat");
const router = require("express").Router();
const User = require("../schemas/User");
const Message = require("../schemas/Message");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middlewares/authMiddleware");

/* Musím udělat kontroler který vrátí všechny chaty které uživateli patří, jejich ids pak loadnu hned při startu*/

router.post(
  "/createChat",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { name, isGroupChat, users } = req.body;
    if ((isGroupChat && !name) || !users) {
      throw new Error("Some properties are missing.");
    } else if (users.length < 2 || (isGroupChat && users.length < 3)) {
      throw new Error("Not enough users.");
    }

    try {
      const chat = await Chat.create({ name, isGroupChat, users });
      res.json(chat);
    } catch (error) {
      throw new Error(error);
    }
  })
);

router.get("/getChats", authMiddleware, (req, res) => {
  const { user } = req.body;
});

module.exports = router;
