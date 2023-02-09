const express = require("express");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Use body-parser to parse form data
router.use(bodyParser.urlencoded({ extended: true }));

// Use express-flash to display flash messages
router.use(flash());

// GET request for the booking form route
router.get("/booking", (req, res) => {
  res.render("booking.ejs", {
    title: "Booking Form",
    successMessage: req.flash("success"),
    errorMessage: req.flash("error"),
  });
});

// POST request for the booking form route
router.post(
  "/booking",
  [
    // Validate the input fields
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required and must be a valid email address")
      .notEmpty()
      .isEmail(),
    check("phone", "Phone is required").notEmpty(),
    check("date", "Date is required").notEmpty(),
    check("time", "Time is required").notEmpty(),
    check("guests", "Guests is required").notEmpty(),
  ],
  (req, res) => {
    // Retrieve values from form fields
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;
    const guests = req.body.guests;
    const message = req.body.message;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash(
        "error",
        "Please fill out the form with valid information and try again."
      );
      return res.redirect("/booking");
    }

    // Construct the message that will be sent to the business
    const mailOptions = {
      from: `${name} <${email}>`,
      to: "myriadmeta@gmail.com", // replace with the email of the business
      subject: "Booking Request",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nMessage: ${message}`,
    };

    // Send the booking request to the business
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "myriadmeta@gmail.com",
        pass: "vqpsnajozbfvthzm",
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        req.flash(
          "error",
          "An error occurred while sending the email. Please try again later."
        );
        return res.redirect("/booking");
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Set the success message using the flash feature
      req.flash("success", "Your booking request was sent successfully!");

      // Redirect to the booking form
      return res.redirect("/booking");
    });
  }
);

// GET request for the contact form route
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// POST request for the contact form route
router.post(
  "/contact",
  [
    // Validate the input fields
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").notEmpty().isEmail(),
    check("message", "Message is required").notEmpty(),
  ],
  (req, res) => {
    // Retrieve values from form fields
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash(
        "error",
        "All fields are required. Please fill out the form and try again."
      );
      return res.redirect("/contact");
    }

    // Construct the message that will be sent to the business
    const mailOptions = {
      from: `${name} <${email}>`,
      to: "myriadmeta@gmail.com", // replace with the email of the business
      subject: "Contact Request",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the contact request to the business
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "myriadmeta@gmail.com",
        pass: "vqpsnajozbfvthzm",
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        req.flash(
          "error",
          "An error occurred while sending the email. Please try again later."
        );
        return res.redirect("/contact");
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Set the success message using the flash feature
      req.flash("success", "Your message was sent successfully!");

      // Redirect to the contact form
      return res.redirect("/contact");
    });
  }
);

module.exports = router;
