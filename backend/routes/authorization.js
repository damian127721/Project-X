const express = require("express")
const {registerController} = require("../controllers/authorizationControllers")

const router = express.Router()

/* router.post("/login", loginController) */
router.post("/register", registerController)

module.exports = router