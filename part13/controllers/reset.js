const router = require("express").Router();
const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  await User.sync({ force: true });
  await Blog.sync({ force: true });

  res.status(200).end();
});

module.exports = router;
