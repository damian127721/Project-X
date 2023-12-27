const express = require("express")
const dotenv = require("dotenv")
const authMiddleware = require("./middlewares/authMiddleware")

const authorizationRoutes = require("./routes/authorizationRoutes")
const { dbConnect } = require("./database")

dotenv.config()

dbConnect()
const app = express()

app.use(express.json())

app.use("/api/user", authorizationRoutes)

app.listen(process.env.PORT, () => {
    console.log("server is running at port " + process.env.PORT)
})