const mysql = require("mysql2");
require("dotenv").config();

let connection;

function createConnection() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
}

function closeConnection() {
  connection.end();
}

function getConnection() {
  return connection;
}

module.exports = {
  createConnection,
  closeConnection,
  getConnection,
};
