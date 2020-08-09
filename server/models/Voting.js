const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
  story: mongoose.Schema.Types.Mixed,
  points: {
    type: Number,
    default: 0,
  },
  voters: [mongoose.Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Votings", votingSchema);
