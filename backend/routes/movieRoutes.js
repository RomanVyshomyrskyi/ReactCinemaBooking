const express = require("express");
const Movie = require("../models/Movie");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.post("/", protect, adminOnly, async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

module.exports = router;