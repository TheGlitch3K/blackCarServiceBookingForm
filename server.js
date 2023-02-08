const express = require("express");
const bodyParser = require("body-parser");
const { createConnection, closeConnection } = require("./db");
const routes = require("./routes");
require("dotenv").config();

// Create a connection to the MySQL server
createConnection();

// Set up the express server
const app = express();
app.set("view engine", "ejs");

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes defined in routes.js
app.use(routes);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

process.on("SIGINT", () => {
  closeConnection();
  process.exit();
});
