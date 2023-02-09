const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const { createConnection, closeConnection } = require("./db");
const routes = require("./routes");
const dotenv = require("dotenv");

require("dotenv").config();

// Create a connection to the MySQL server
createConnection();

// Set up the express server
const app = express();
app.set("view engine", "ejs");

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Use express-session for storing sessions
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Use connect-flash to display flash messages
app.use(flash());

// Use the routes defined in routes.js
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

process.on("SIGINT", () => {
  closeConnection();
  process.exit();
});
