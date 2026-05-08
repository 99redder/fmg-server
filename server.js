/*
======================================
; Title: server.js
; Author: Red
; Date Created: 12 July 2023
; Last Updated: 17 January 2026
; Description: The node init file that sets up the server
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

require("dotenv").config();

const crypto = require("crypto");

const requiredEnvVars = ["DB_PASSWORD", "DB_USER", "LOGIN_PASSWORD"];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error(`FATAL: Missing required environment variable(s): ${missingEnvVars.join(", ")}.`);
  process.exit(1);
}

if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
  console.error("FATAL: JWT_SECRET must be at least 32 characters long.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET is not set. Deriving JWT signing secret from LOGIN_PASSWORD. Set JWT_SECRET in production for better secret separation.");
  process.env.JWT_SECRET = crypto
    .createHash("sha256")
    .update(`fmg-server-jwt:${process.env.LOGIN_PASSWORD}`)
    .digest("hex");
}

// app imports
const express = require("express");
const cors = require("cors");
const app = express();

// sets origin for cors to the local host for the front end (angular) project
var corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const { ConnectionAcquireTimeoutError } = require("sequelize");
const { sequelize } = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the FMG-Tracker server application." });
});

// require Sale, Supply, and Advert Routes
require("./app/routes/sale.routes")(app);
require("./app/routes/supply.routes")(app);
require("./app/routes/advert.routes")(app);
require("./app/routes/queries.routes")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
