const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const requests = require("./constants/requests");

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

const makePutRequest = async (key, body) => {
  try {
    return await axios.put(
      `${process.env.JIRA_API_URL}${process.env.JIRA_ISSUE_ENDPOINT}${key}`,
      body,
      {
        headers: {
          Authorization: `Basic ${process.env.JIRA_AUTH_TOKEN}`,
        },
      }
    );
  } catch (e) {
    console.error(e.response);
  }
};

const makeGetRequest = async (query) => {
  try {
    return await axios.get(
      `${process.env.JIRA_API_URL}${process.env.JIRA_SEARCH_ENDPOINT}${query}`,
      {
        headers: {
          Authorization: `Basic ${process.env.JIRA_AUTH_TOKEN}`,
        },
      }
    );
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
  socket.on(requests.CREATE_USER, async (userName) => {
    const user = new Users({
      name: userName,
    });

    try {
      const savedUser = await user.save();

      socket.emit(requests.USER_CREATED, savedUser);
    } catch (e) {
      socket.emit(requests.USER_CREATED, { error: e });
    }
  });

  socket.on(requests.CONNECT_USER, async (userId) => {
    const user = await Users.findOne({ _id: userId });

    if (!Boolean(connectedUsers.filter((user) => user._id == userId).length)) {
      connectedUsers.push(user);
    }

    io.emit(requests.USER_CONNECTED, connectedUsers);
  });

  socket.on(requests.SET_MODERATOR_ROLE, async (userId) => {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { role: "moderator" },
      { new: true }
    );

    const userIndex = connectedUsers.findIndex((user) => user.id == userId);

    connectedUsers[userIndex].role = "moderator";

    io.emit(requests.USER_CONNECTED, connectedUsers);
  });

  socket.on(requests.DISCONNECT_USER, async (userId) => {
    const userIndex = connectedUsers.findIndex((user) => user._id == userId);

    connectedUsers.splice(userIndex, 1);

    io.emit(requests.USER_CONNECTED, connectedUsers);
  });

  socket.on(requests.GET_STORIES_LIST, async () => {
    const tasks = await Tasks.find();

    io.emit(requests.STORIES_LIST, sendNotDeletedTasks(tasks));
  });

  socket.on(requests.CREATE_STORY, async ({ name, description }) => {
    const task = new Tasks({
      name,
      description,
    });

    try {
      await task.save();

      const tasks = await Tasks.find();

      io.emit(requests.STORIES_LIST, sendNotDeletedTasks(tasks));
    } catch (e) {
      io.emit(requests.STORIES_LIST, e);
    }
  });

  socket.on(requests.DELETE_STORY, async (taskId) => {
    await Tasks.findOneAndUpdate(
      { _id: taskId },
      { isDeleted: true },
      { new: true }
    );

    const tasks = await Tasks.find();

    io.emit(requests.STORIES_LIST, sendNotDeletedTasks(tasks));
  });

  socket.on(requests.SET_VOTE, async ({ storyId, userId, points }) => {
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
          io.emit(requests.GET_VOTES_LIST, savedVote.voters);
          io.emit(requests.VOTE_ENDED, true);
        } else {
          io.emit(requests.GET_VOTES_LIST, flattenVotesList(savedVote.voters));
        }
      } else {
        doc.voters = editOrPushVote(doc.voters, { userId, points });
        await doc.save();

        if (doc.voters.length === connectedUsers.length) {
          io.emit(requests.GET_VOTES_LIST, doc.voters);
          io.emit(requests.VOTE_ENDED, true);
        } else {
          io.emit(requests.GET_VOTES_LIST, flattenVotesList(doc.voters));
        }
      }
    });
  });

  socket.on(requests.CLEAR_VOTE, async ({ storyId }) => {
    await Votes.findOne({ storyId }, async (err, doc) => {
      if (err) {
        throw new Error(err);
      }

      doc.voters = [];

      await doc.save();

      io.emit(requests.GET_VOTES_LIST, doc.voters);
      io.emit(requests.VOTE_ENDED, false);
    });
  });

  socket.on(requests.SKIP_STORY, async (taskId) => {
    await Tasks.findOneAndUpdate(
      { _id: taskId },
      { isActive: false, points: null },
      { new: true }
    );

    const tasks = await Tasks.find();

    io.emit(requests.STORIES_LIST, sendNotDeletedTasks(tasks));
  });

  socket.on(requests.END_VOTE, async ({ taskId, points }) => {
    const task = await Tasks.findOneAndUpdate(
      { _id: taskId },
      { points, isActive: false },
      { new: true }
    );

    await makePutRequest(task.jiraKey, {
      fields: {
        [process.env.JIRA_STORYPOINTS_FIELD]: task.points,
      },
    });

    const tasks = await Tasks.find();

    io.emit(requests.APP_RESET);
    io.emit(requests.STORIES_LIST, sendNotDeletedTasks(tasks));
  });

  socket.on(requests.GET_EPICS_LIST, async () => {
    const epics = await makeGetRequest(
      "project%3D%22Marfa%20CAT%22%20AND%20issuetype%3D%22Epic%22&fields=summary"
    );

    socket.emit(
      requests.EPICS_LIST,
      epics.data.issues.map((epic) => ({
        id: epic.id,
        key: epic.key,
        name: epic.fields.summary,
      }))
    );
  });

  socket.on(requests.GET_ISSUES_LIST, async (list) => {
    const issuesRaw = await Promise.all(
      list.map(async (epic) => {
        const epicDetails = await makeGetRequest(
          `%22Epic%20Link%22%3D${epic}&fields=summary,description`
        );

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

    issues.forEach(async ({ name, description, id, key, link }) => {
      const task = new Tasks({
        name,
        description,
        jiraKey: key,
        jiraId: id,
        jiraLink: link,
      });

      try {
        await task.save();

        const tasks = await Tasks.find();

        io.emit(requests.STORIES_LIST, sendNotDeletedTasks(tasks));
      } catch (e) {
        io.emit(requests.STORIES_LIST, e);
      }
    });
  });
};

io.on("connection", onConnect);

server.listen(process.env.APP_PORT, () => console.log("Server started"));
