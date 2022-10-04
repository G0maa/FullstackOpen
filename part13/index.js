const express = require("express");
require("express-async-errors");
const app = express();
const logger = require("morgan");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const middleware = require("./util/middleware");
const blogsRouter = require("./controllers/blogs");

app.use(logger("tiny"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
