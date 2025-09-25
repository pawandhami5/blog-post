const express = require("express");
require("./db/mongoose"); // Ensure mongoose connects to the database
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRouts");
const commentRouter = require("./routes/commentRoutes");

const app = express();
app.use(express.json());
console.log("");

app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.use((err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.name === "ValidationError") statusCode = 400;
  if (err.name === "CastError") statusCode = 400;

  res.status(statusCode).json({
    error: err.message || "something went wrong",
  });
});

module.exports = app;
