/*
======================================
; Title: transaction.controller.js
; Author: Chris Gorham
; Date Created: 26 August 2023
; Last Updated: 26 August 2023
; Description: This code sets up the Query controller
; Sources Used: N/A
;=====================================
*/

// imports
const { sequelize } = require('../models/index');

exports.getMultipleQueries = async (req, res) => {
    try {
      // Query for: total gross sales for all of 2023
      const query1 = "SELECT SUM(salesPrice) AS totalSales2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for: total shipping costs for all of 2023
      const query2 = "SELECT SUM(shippingCost) AS totalShipping2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
  
      const [result1, result2] = await Promise.all([
        sequelize.query(query1, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query2, {
          type: sequelize.QueryTypes.SELECT,
        }),
      ]);
  
      res.json({ totalSales2023: result1[0].totalSales2023, totalShipping2023: result2[0].totalShipping2023 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
