const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  favouriteGenre: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = mongoose.model("User", schema);
