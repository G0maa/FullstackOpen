const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const User = require("../models/user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  let isPasswordCorrect = false;
  if (user)
    isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    res.status(401).json({
      error: "invalid username or password",
    });
    return;
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
