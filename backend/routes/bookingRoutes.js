const express = require("express");
const Booking = require("../models/Booking");
const Session = require("../models/Session");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { sessionId, row, column } = req.body;
  const booking = new Booking({
    user: req.user.id,
    session: sessionId,
    seat: { row, column },
    paid: true,
  });
  await booking.save();
  res.json({ message: "Оплата пройшла успішно", booking });
});

router.get("/:sessionId", protect, async (req, res) => {
  const bookings = await Booking.find({ session: req.params.sessionId });
  res.json(bookings);
});

module.exports = router;
