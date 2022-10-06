const router = require("express").Router();

const { Session } = require("../models");
const {
  tokenExtractor,
  userExtractor,
  isTokenValid,
} = require("../util/middleware");

// api/logout
// deletes only given token
router.post(
  "/",
  tokenExtractor,
  userExtractor,
  isTokenValid,
  async (req, res) => {
    Session.destroy({
      where: {
        userId: req.user.id,
        token: req.token,
      },
    });

    res.status(200).end();
  }
);

module.exports = router;
