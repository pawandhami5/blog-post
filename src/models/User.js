const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
