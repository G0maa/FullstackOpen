const express = require("express");

const redis = require("../redis");
const { Todo } = require("../mongo");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let countTodos = await redis.getAsync("added_todos");

  countTodos = Number(countTodos);

  await redis.setAsync("added_todos", countTodos + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo).end();
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const body = req.body;

  req.todo.text = body.text;
  req.todo.done = body.done;

  await req.todo.save();

  res.json(req.todo).end();
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
