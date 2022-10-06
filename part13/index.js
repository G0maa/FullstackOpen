const express = require("express");
require("express-async-errors");
const app = express();
const logger = require("morgan");

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

const middleware = require("./util/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readinglists");
const resetRouter = require("./controllers/reset");

app.use(logger("tiny"));
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/reset", resetRouter);

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
