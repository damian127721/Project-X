const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const authMiddleware = require("./middlewares/authMiddleware")
const {errorCustom} = require("./middlewares/errorMiddlewares")

const authorizationRoutes = require("./routes/authorizationRoutes")
const { dbConnect } = require("./database")

dotenv.config()

dbConnect()
const app = express()

app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}))

app.use("/api/user", authorizationRoutes)

app.use(errorCustom)

app.listen(process.env.PORT, () => {
    console.log("server is running at port " + process.env.PORT)
})