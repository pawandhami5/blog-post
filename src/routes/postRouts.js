const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");
const multer = require("multer");
// const path = require("path");
// const upload = multer({ dest: path.join(__dirname, "uploads/") });
const upload = multer({ storage: multer.memoryStorage() });
const videoService = require("../services/video-service");

router.post(
  "/post/create",
  upload.single("media"),
  asyncHandler(async (req, res) => {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    await videoService.videoProcessing(fileName, req.file.buffer);
    req.body.fileName = fileName;
    console.log(req.body);
    const post = new Post(req.body);
    await post.save();
    res.send(post);
  })
);

// router.post(
//   "/post/create",
//   asyncHandler(async (req, res) => {
//     const post = new Post(req.body);
//     await post.save();
//     res.send(post);
//   })
// );

// route parameter
router.get(
  "/post/:id",
  asyncHandler(async (req, res) => {
    console.log(req.params.id);
    // const posts = await Post.findById({ _id: req.params.id }).populate(
    //   "comments"
    // );
    const _id = new mongoose.Types.ObjectId(req.params.id);
    const posts = await Post.aggregate([
      {
        $match: { _id },
      },
      {
        $addFields: {
          mediaUrl: await videoService.getMediaUrl("$fileName"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author_details",
        },
      },
      {
        $unwind: "$author_details",
      },
      {
        $addFields: {
          user: "$author_details.username",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "comments.user",
        },
      },
      {
        $unwind: {
          path: "$comments.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "comments.user": "$comments.user.username",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          content: { $first: "$content" },
          mediaUrl: { $first: "$mediaUrl" },
          user: { $first: "$user" },
          comments: { $push: "$comments" },
        },
      },
      {
        // check if comment is null
        $addFields: {
          comments: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: {
                $and: [
                  { $ne: ["$$comment", null] },
                  { $gt: [{ $ifNull: ["$$comment._id", null] }, null] },
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          total_comments: { $size: "$comments" },
        },
      },
    ]);
    if (!posts) {
      res.status(404);
      throw new Error("post not found");
    }
    console.log(posts);
    res.send(posts);
  })
);

module.exports = router;
