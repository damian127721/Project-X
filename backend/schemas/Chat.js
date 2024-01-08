const mongoose = require("mongoose");

const ChatScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", ChatScheme);
