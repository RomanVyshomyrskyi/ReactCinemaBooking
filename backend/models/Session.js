const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  date: Date,
  hall: String,
  seats: [[{ type: Boolean, default: false }]],
});

module.exports = mongoose.model("Session", sessionSchema);