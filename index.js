require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 8000;

app.get("/api/health", (req, res) => {
  res.send("node app is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
