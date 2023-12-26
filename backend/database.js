const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

module.exports.dbConnect = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_URI)

        console.log("MongoDB connected: " + db.connection.host)
    } catch(error) {
        console.log("MongoDB error: " + error.message)
    }
}