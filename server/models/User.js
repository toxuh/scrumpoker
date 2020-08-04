const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 120,
    min: 3,
  },
});

module.exports = mongoose.model("Users", userSchema);
