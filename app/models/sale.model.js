/*
======================================
; Title: sale.model.js
; Author: Red
; Date Created: 12 July 2023
; Last Updated: 31 July 2023
; Description: This code sets up the Sale model
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define("sale", {
      itemDescription: {
        type: Sequelize.STRING
      },
      salesDate: {
        type: Sequelize.DATEONLY
      },
      salesPrice: {
        type: Sequelize.DECIMAL(6,2)
      },
      etsyTransactionFee: {
        type: Sequelize.DECIMAL(6,2)
      },
      etsyMarketingFee: {
        type: Sequelize.DECIMAL(6,2)
      },
      etsyProcessingFee: {
        type: Sequelize.DECIMAL(6,2)
      },
      etsyListingFee: {
        type: Sequelize.DECIMAL(6,2)
      },
      etsyShippingFee: {
        type: Sequelize.DECIMAL(6,2)
      },
      shippingCost: {
        type: Sequelize.DECIMAL(6,2)
      },
      customBoxCost: {
        type: Sequelize.DECIMAL(6,2)
      },
      oldMaterialOffset: {
        type: Sequelize.DECIMAL(6,2)
      },
      notes: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Sale;
  };