/*
======================================
; Title: server.js
; Author: Chris Gorham
; Date Created: 12 July 2023
; Last Updated: 17 January 2026
; Description: The node init file that sets up the server
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
