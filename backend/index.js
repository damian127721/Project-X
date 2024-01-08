const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorCustom, notFound } = require("./middlewares/errorMiddlewares");

const featureRoutes = require("./routes/featureRoutes");
const authorizationRoutes = require("./routes/authorizationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { dbConnect } = require("./database");

dotenv.config();

dbConnect();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/user", authorizationRoutes);
app.use("/api/feature", featureRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorCustom);

app.listen(process.env.PORT, () => {
  console.log("server is running at port " + process.env.PORT);
});
