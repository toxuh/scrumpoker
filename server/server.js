const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const Users = require("./models/User");
const Tasks = require("./models/Task");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB connected")
);

app.use(express.json());

const onConnect = (socket) => {
  socket.on("create-user", async (userName) => {
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

  socket.on("get-tasks", async () => {
    const tasks = await Tasks.find();

    io.emit("tasks-list", tasks);
  });

  socket.on("new-task", async ({ name, description }) => {
    const task = new Tasks({
      name,
      description,
    });

    try {
      const savedTask = await task.save();
      const tasks = await Tasks.find();

      io.emit("tasks-list", tasks);
    } catch (e) {
      io.emit("new-task-error", e);
    }
  });
};

io.on("connection", onConnect);

server.listen(process.env.APP_PORT, () => console.log("Server started"));
