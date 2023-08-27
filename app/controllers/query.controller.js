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
      const query2 = "SELECT SUM(shippingCost + customBoxCost + oldMaterialOffset) AS totalShipping2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for adding all of the Etsy Fees for all of 2023
      const query3 = "SELECT SUM(etsyTransactionFee + etsyMarketingFee + etsyProcessingFee + etsyListingFee + etsyShippingFee) AS totalEtsyFees2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for counting the number of sales for all of 2023
      const query4 = "SELECT COUNT(*) FROM sales as totalSalesCount2023 where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for adding all of the Supply costs for all of 2023
      const query5 = "SELECT SUM(itemTotalCost) AS suppliesTotal2023 from supplies where purchaseDate between '2023-01-01' and '2023-12-31'";
      // Query for adding all of the Advertising costs for all of 2023
      const query6 = "SELECT SUM(amtCharged) AS advertsTotal2023 from adverts where dateCharged between '2023-01-01' and '2023-12-31'";
  
      const [result1, result2, result3, result4, result5, result6] = await Promise.all([
        sequelize.query(query1, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query2, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query3, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query4, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query5, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query6, {
          type: sequelize.QueryTypes.SELECT,
        })
      ]);
  
      res.json({ 
        totalSales2023: result1[0].totalSales2023, 
        totalShipping2023: result2[0].totalShipping2023, 
        totalEtsyFees2023: result3[0].totalEtsyFees2023, 
        suppliesTotal2023: result5[0].suppliesTotal2023,
        advertsTotal2023: result6[0].advertsTotal2023,
        totalSalesCount2023: result4[0]});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
