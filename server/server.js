const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
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

const makeRequest = async ({ type, query }) => {
  const endpoint = type === "search" ? "/search?jql=" : "/issue/";

  try {
    return await axios.get(`${process.env.JIRA_API_URL}${endpoint}${query}`, {
      headers: {
        Authorization: `Basic ${process.env.JIRA_AUTH_TOKEN}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

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

  socket.on("moderator-role", async (userId) => {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { role: "moderator" },
      { new: true }
    );

    const userIndex = connectedUsers.findIndex((user) => user.id == userId);

    connectedUsers[userIndex].role = "moderator";

    io.emit("users-connected", connectedUsers);
  });

  socket.on("disconnect-user", async (userId) => {
    const userIndex = connectedUsers.findIndex((user) => user._id == userId);

    connectedUsers.splice(userIndex, 1);

    io.emit("users-connected", connectedUsers);
  });

  socket.on("get-stories", async () => {
    const tasks = await Tasks.find();

    io.emit("tasks-list", sendNotDeletedTasks(tasks));
  });

  socket.on("new-story", async ({ name, description }) => {
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

  socket.on("remove-story", async (taskId) => {
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

  socket.on("skip-story", async (taskId) => {
    await Tasks.findOneAndUpdate(
      { _id: taskId },
      { isActive: false, points: null },
      { new: true }
    );

    const tasks = await Tasks.find();

    io.emit("tasks-list", sendNotDeletedTasks(tasks));
  });

  socket.on("end-voting", async ({ taskId, points }) => {
    await Tasks.findOneAndUpdate(
      { _id: taskId },
      { points, isActive: false },
      { new: true }
    );

    io.emit("reset");
  });

  socket.on("jira-get-epics", async () => {
    const epics = await makeRequest({
      type: "search",
      query:
        "project%3D%22Marfa%20CAT%22%20AND%20issuetype%3D%22Epic%22&fields=summary",
    });

    socket.emit(
      "jira-epics-list",
      epics.data.issues.map((epic) => ({
        id: epic.id,
        key: epic.key,
        name: epic.fields.summary,
      }))
    );
  });

  socket.on("jira-get-stories", async (list) => {
    const issuesRaw = await Promise.all(
      list.map(async (epic) => {
        const epicDetails = await makeRequest({
          type: "search",
          query: `%22Epic%20Link%22%3D${epic}&fields=summary,description`,
        });

        return epicDetails.data.issues.map((issue) => {
          const obj = {
            id: issue.id,
            key: issue.key,
            link: issue.self,
            name: issue.fields.summary,
            description: issue.fields.description,
          };

          return obj;
        });
      })
    );

    const issues = issuesRaw.flat();

    issues.forEach(async ({ name, description, id, key }) => {
      const task = new Tasks({
        name,
        description,
        jiraKey: key,
        jiraId: id,
      });

      try {
        await task.save();

        const tasks = await Tasks.find();

        io.emit("tasks-list", sendNotDeletedTasks(tasks));
      } catch (e) {
        io.emit("new-task-error", e);
      }
    });
  });
};

io.on("connection", onConnect);

server.listen(process.env.APP_PORT, () => console.log("Server started"));
