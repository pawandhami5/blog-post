const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");

// Create a new comment
router.post(
  "/comment/create",
  asyncHandler(async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.send(comment);
  })
);

router.get(
  "/comment/:postId",
  asyncHandler(async (req, res) => {
    const postId = new mongoose.Types.ObjectId(req.params.postId);

    const comments = await Comment.find({ postId })
      .populate("userId", "username")
      .populate({
        path: "postId",
        select: "title content",
      });
    if (!comments) {
      res.status = 404;
      throw new Error("comment not found");
    }
    res.send(comments);
  })
);

module.exports = router;
