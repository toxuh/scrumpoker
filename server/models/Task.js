const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true,
    max: 250,
    min: 3,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  points: {
    type: Number,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
