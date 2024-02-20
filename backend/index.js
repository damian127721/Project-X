const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { errorCustom, notFound } = require("./middlewares/errorMiddlewares");
const featureRoutes = require("./routes/featureRoutes");
const authorizationRoutes = require("./routes/authorizationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { dbConnect } = require("./database");
const path = require("path");

dotenv.config();

dbConnect();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/user", authorizationRoutes);
app.use("/api/feature", featureRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  console.log("production !");
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("/", (req, res) => {
    res.sendFile(__dirname1, "frontend", "build", "index.html");
  });
} else {
  console.log("development");
  app.get("/", (req, res) => {
    res.send("We are in development !");
  });
}

app.use(notFound);
app.use(errorCustom);

const server = app.listen(process.env.PORT, () => {
  console.log("server is running at port " + process.env.PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id + " connected");
  const { userId } = socket.handshake.query;

  socket.join(userId);

  socket.on("disconnect", () => console.log(socket.id + " disconnected"));
  socket.on("message", (message, room) => {
    socket.to(room).emit("message", message);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} has joined room ${room}`);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} has left room ${room}`);
  });

  socket.on("notif", (userId) => {
    socket.to(userId).emit("notif");
    console.log("notif " + userId);
  });
});
