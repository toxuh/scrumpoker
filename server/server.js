const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const userRouter = require("./routes/users");
const taskRouter = require("./routes/tasks");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected")
);

app.use(express.json());

app.use(`${process.env.API_URL}/users`, userRouter);
app.use(`${process.env.API_URL}/tasks`, taskRouter);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    console.log(userId, userName);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
});

server.listen(process.env.APP_PORT, () => console.log("Server started"));
