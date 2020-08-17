const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const Users = require("./models/User");
const Tasks = require("./models/Task");
const Votes = require("./models/Voting");

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

const editOrPushVote = (array, obj) => {
  const userIndex = array.findIndex((e) => {
    return e.userId === obj.userId;
  });

  if (userIndex !== -1) {
    array[userIndex].points = obj.points;
  } else {
    array.push(obj);
  }

  return array;
};

const flattenVotesList = (array) => {
  return array.map(({ userId }) => ({ userId }));
};

const connectedUsers = [];

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

  socket.on("vote", async ({ storyId, userId, points }) => {
    await Votes.findOne({ storyId }, async (err, doc) => {
      if (err) {
        throw new Error(err);
      }

      if (!doc) {
        const vote = new Votes({
          storyId,
          voters: [{ userId, points }],
        });

        const savedVote = await vote.save();

        if (savedVote.voters.length === connectedUsers.length) {
          io.emit("votes-list", savedVote.voters);
          io.emit("end-vote", true);
        } else {
          io.emit("votes-list", flattenVotesList(savedVote.voters));
        }
      } else {
        doc.voters = editOrPushVote(doc.voters, { userId, points });
        await doc.save();

        if (doc.voters.length === connectedUsers.length) {
          io.emit("votes-list", doc.voters);
          io.emit("end-vote", true);
        } else {
          io.emit("votes-list", flattenVotesList(doc.voters));
        }
      }
    });
  });

  socket.on("clear-votes", async ({ storyId }) => {
    await Votes.findOne({ storyId }, async (err, doc) => {
      if (err) {
        throw new Error(err);
      }

      doc.voters = [];

      await doc.save();

      io.emit("votes-list", doc.voters);
      io.emit("end-vote", false);
    });
  });
};

io.on("connection", onConnect);

server.listen(process.env.APP_PORT, () => console.log("Server started"));
