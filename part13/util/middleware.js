const jwt = require("jsonwebtoken");
const { Session } = require("../models");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    return response.status(401).json({ error: "token missing" });
  }

  return next();
};

// Problem: Changing some letters in Authorization header can
// lead to .verify() failing, due to JSON.parse.
const userExtractor = async (request, response, next) => {
  if (request.token) {
    request.user = jwt.verify(request.token, process.env.SECRET);
  }
  if (!request.user || !request.user.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  return next();
};

const isTokenValid = async (req, res, next) => {
  const isValid = await Session.findOne({
    where: {
      userId: req.user.id,
      token: req.token,
    },
  });

  if (!isValid) {
    res.status(401).json({ error: "Token is outdated." });
    return;
  }

  return next();
};

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
  if (error.name === "SequelizeUniqueConstraintError") {
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
  tokenExtractor,
  userExtractor,
  isTokenValid,
};
