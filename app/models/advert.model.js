/*
======================================
; Title: advert.model.js
; Author: Chris Gorham
; Date Created: 05 August 2023
; Last Updated: 05 August 2023
; Description: This code sets up the Supply model
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

module.exports = (sequelize, Sequelize) => {
    const Advert = sequelize.define("advert", {
      advertDescription: {
        type: Sequelize.STRING
      },
      dateCharged: {
        type: Sequelize.DATE
      },
      amtCharged: {
        type: Sequelize.DECIMAL(6,2)
      },
      notes: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Advert;
  };