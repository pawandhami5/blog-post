const mongoose = require("mongoose");

const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/blog-posts";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose;
