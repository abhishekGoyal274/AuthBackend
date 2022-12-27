const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
