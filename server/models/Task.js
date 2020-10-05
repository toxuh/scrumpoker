const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
    max: 250,
    min: 3,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  points: {
    type: Number,
  },
  jiraKey: {
    type: String,
  },
  jiraId: {
    type: String,
  },
  jiraLink: {
    type: String,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
