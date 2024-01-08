const mongoose = require("mongoose");

const MessageScheme = mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Message", MessageScheme);
