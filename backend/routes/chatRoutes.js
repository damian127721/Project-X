const Chat = require("../schemas/Chat");
const router = require("express").Router();

router.get("/", () => {
  console.log("testik bambik");
});

module.exports = router;
