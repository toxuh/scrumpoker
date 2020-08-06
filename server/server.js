const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const Users = require("./models/User");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected")
);

app.use(express.json());

io.on("connection", (socket) => {
  socket.on("create-user", async (userName) => {
    console.log(userName);

    const user = new Users({
      name: userName,
    });

    try {
      const savedUser = await user.save();

      io.emit("user-saved", savedUser);
    } catch (e) {
      io.emit("user-saved", { error: e });
    }
  });

  socket.on("get-user-name", async (userId) => {
    const user = await Users.findOne({ _id: userId });

    io.emit("user-name", user);
  });

  socket.on("connect-user", async (userId) => {
    const user = await Users.findOne({ _id: userId });

    socket.broadcast.emit("user-connected", user);
  });
});

server.listen(process.env.APP_PORT, () => console.log("Server started"));
