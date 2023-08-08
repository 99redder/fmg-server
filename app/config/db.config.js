/*
======================================
; Title: db.config.js
; Author: Chris Gorham
; Date Created: 12 July 2023
; Last Updated: 31 July 2023
; Description: This code sets up the database login information into variables
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

module.exports = {
    HOST: "localhost",
    USER: "fmg_db",
    PASSWORD: "REMOVED_LEAKED_DB_PASSWORD",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };