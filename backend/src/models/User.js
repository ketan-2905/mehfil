const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  profilePic: String,
  phone: String,
  username: String,
  temporary: Boolean,
  expiresAt: Date,
});

module.exports = mongoose.model("User", userSchema);