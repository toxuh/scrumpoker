const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      userId: {
        type: String,
        required: true,
      },
      points: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Votings", votingSchema);
