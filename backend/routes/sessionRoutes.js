const express = require("express");
const Session = require("../models/Session");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const sessions = await Session.find().populate("movie");
  res.json(sessions);
});

router.post("/", protect, adminOnly, async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.json(session);
});

module.exports = router;