const express = require("express");
const { handleBookingForm } = require("./bookingForm");

const router = express.Router();

router.get("/booking", (req, res) => {
  res.render("booking.ejs", { title: "Booking Form" });
});

router.post("/booking", handleBookingForm);

module.exports = router;
