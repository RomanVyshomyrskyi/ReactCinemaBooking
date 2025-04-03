const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
});

module.exports = mongoose.model("Movie", movieSchema);