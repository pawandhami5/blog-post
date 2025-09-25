const express = require("express");
const router = express.Router();
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// Create a new user
router.post(
  "/user",
  asyncHandler(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  })
);

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// Get a user by ID
router.get(
  "/user/:id",
  asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({ _id });
    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }
    res.send(user);
  })
);
module.exports = router;
