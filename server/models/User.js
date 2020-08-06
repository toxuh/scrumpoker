const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 120,
    min: 3,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
