/*
======================================
; Title: supply.model.js
; Author: Chris Gorham
; Date Created: 12 July 2023
; Last Updated: 31 July 2023
; Description: This code sets up the Supply model
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

module.exports = (sequelize, Sequelize) => {
    const Supply = sequelize.define("supply", {
      itemName: {
        type: Sequelize.STRING
      },
      purchaseDate: {
        type: Sequelize.DATE
      },
      itemCost: {
        type: Sequelize.DECIMAL(6,2)
      },
      itemTax: {
        type: Sequelize.DECIMAL(6,2)
      },
      itemTotalCost: {
        type: Sequelize.DECIMAL(6,2)
      },
      notes: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Supply;
  };