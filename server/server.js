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
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("DB connected")
);

app.use(express.json());

const sendNotDeletedTasks = (tasks) => {
  return tasks.filter((task) => !task.isDeleted);
};

const connectedUsers = [];
const usersVoted = [];
const votes = [];

const onConnect = (socket) => {
  socket.on("create-user", async (userName) => {
    const user = new Users({
      name: userName,
    });

    try {
      const savedUser = await user.save();

      socket.emit("user-saved", savedUser);
    } catch (e) {
      socket.emit("user-saved", { error: e });
    }
  });

  socket.on("get-user-name", async (userId) => {
    const user = await Users.findOne({ _id: userId });

    socket.emit("user-name", user);
  });

  socket.on("connect-user", async (userId) => {
    const user = await Users.findOne({ _id: userId });

    if (!Boolean(connectedUsers.filter((user) => user._id == userId).length)) {
      connectedUsers.push(user);
    }

    io.emit("users-connected", connectedUsers);
  });

  socket.on("disconnect-user", async (userId) => {
    const userIndex = connectedUsers.findIndex((user) => user._id == userId);

    connectedUsers.splice(userIndex, 1);

    io.emit("users-connected", connectedUsers);
  });

  socket.on("get-tasks", async () => {
    const tasks = await Tasks.find();

    io.emit("tasks-list", sendNotDeletedTasks(tasks));
  });

  socket.on("new-task", async ({ name, description }) => {
    const task = new Tasks({
      name,
      description,
    });

    try {
      await task.save();

      const tasks = await Tasks.find();

      io.emit("tasks-list", sendNotDeletedTasks(tasks));
    } catch (e) {
      io.emit("new-task-error", e);
    }
  });

  socket.on("remove-task", async (taskId) => {
    await Tasks.findOneAndUpdate(
      { _id: taskId },
      { isDeleted: true },
      { new: true }
    );

    const tasks = await Tasks.find();

    io.emit("tasks-list", sendNotDeletedTasks(tasks));
  });

  socket.on("vote", async ({ user }) => {
    usersVoted.push(user._id);

    io.emit("votes-list", usersVoted);
  });
};

io.on("connection", onConnect);

server.listen(process.env.APP_PORT, () => console.log("Server started"));
