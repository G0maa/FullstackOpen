const express = require("express");
const router = express.Router();

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
    // test: "hello",
  });
});

router.get("/ping", (reg, res) => {
  res.send("pong");
});

module.exports = router;
