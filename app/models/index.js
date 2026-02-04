/*
======================================
; Title: index.js
; Author: Red
; Date Created: 12 July 2023
; Last Updated: 17 January 2026
; Description: This code sets up the db and Sequelize connections
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: process.env.DB_HOST ? {
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  } : {},
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sales = require("./sale.model.js")(sequelize, Sequelize);
db.supplies = require("./supply.model.js")(sequelize, Sequelize);
db.advertising = require("./advert.model.js")(sequelize, Sequelize);

// exports all into a variable
module.exports = db;
