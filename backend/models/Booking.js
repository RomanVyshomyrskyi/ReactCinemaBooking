const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  seat: { row: Number, column: Number },
  paid: { type: Boolean, default: false },
});

module.exports = mongoose.model("Booking", bookingSchema);