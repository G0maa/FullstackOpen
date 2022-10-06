const router = require("express").Router();

const { Session } = require("../models");
const User = require("../models/user");

// api/disable/:id
router.post("/:id", async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "username", "disabled"],
  });

  user.disabled = !user.disabled;

  await user.save();

  if (user.disabled === true) {
    Session.destroy({
      where: {
        userId: req.params.id,
      },
    });
  }

  res.status(200).json(user);
});

module.exports = router;
