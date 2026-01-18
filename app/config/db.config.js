/*
======================================
; Title: db.config.js
; Author: Chris Gorham
; Date Created: 12 July 2023
; Last Updated: 17 January 2026
; Description: This code sets up the database login information into variables
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || 3306,
    USER: process.env.DB_USER || "fmg_db",
    PASSWORD: process.env.DB_PASSWORD || "REMOVED_LEAKED_DB_PASSWORD",
    DB: process.env.DB_NAME || "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };