const { response } = require("express");
const { restart } = require("nodemon");

const errorHandler = (error, req, res, next) => {
  const errorJson = JSON.stringify(error, null, 2);
  console.error("error name", error.name);
  console.error("error", errorJson);

  if (error.name === "SyntaxError") {
    return res
      .status(500)
      .json({ error: "Probably JSON.parse() failed, see server logs." });
  }
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "TypeError") {
    return res.status(400).json({ error: error.message });
  }

  return next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
