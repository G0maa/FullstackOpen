const bcrypt = require("bcrypt");
const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { name, username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    username,
    passwordHash,
  });

  res.json(user);
});

// Will errorHandler middleware catch if user is null?
// Should it?

router.get("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  res.json(user);
});

// Maybe request a token here, currently it doesn't request a token.
router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  user.username = req.body.username;
  await user.save();

  res.json(user);
});

module.exports = router;
