const mongoose = require("mongoose");

const MessageScheme = mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Message", MessageScheme);
