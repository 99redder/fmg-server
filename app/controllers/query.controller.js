/*
======================================
; Title: transaction.controller.js
; Author: Chris Gorham
; Date Created: 26 August 2023
; Last Updated: 27 August 2023
; Description: This code sets up the Query controller
; Sources Used: N/A
;=====================================
*/

// imports
const { sequelize } = require('../models/index');

exports.getMultipleQueries = async (req, res) => {
    try {

      // 2023 Stat Queries
      // Query for: total gross sales for all of 2023
      const query1 = "SELECT SUM(salesPrice) AS totalSales2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for: total shipping costs for all of 2023
      const query2 = "SELECT SUM(shippingCost + customBoxCost + oldMaterialOffset) AS totalShipping2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for adding all of the Etsy Fees for all of 2023
      const query3 = "SELECT SUM(etsyTransactionFee + etsyMarketingFee + etsyProcessingFee + etsyListingFee + etsyShippingFee) AS totalEtsyFees2023 from sales where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for counting the number of sales for all of 2023
      const query4 = "SELECT COUNT(*) FROM sales as totalSalesCount2023 where salesDate between '2023-01-01' and '2023-12-31'";
      // Query for adding all of the Supplies costs for all of 2023
      const query5 = "SELECT SUM(itemTotalCost) AS suppliesTotal2023 from supplies where purchaseDate between '2023-01-01' and '2023-12-31'";
      // Query for adding all of the Advertising costs for all of 2023
      const query6 = "SELECT SUM(amtCharged) AS advertsTotal2023 from adverts where dateCharged between '2023-01-01' and '2023-12-31'";

      // All Time Item Stat Queries
      // Counts all Gohan Hat sales (every size) for all-time
      const query13 = "SELECT COUNT(*) FROM sales as gohanCount where itemDescription LIKE 'Baby Gohan Hat (%'";
      // Counts all Gohan Hat Pattern sales for all-time
      const query14 = "SELECT COUNT(*) FROM sales as patternCount where itemDescription LIKE 'Baby Gohan Hat Pattern%'";

      // All-Time Queries
      // Query for: total gross sales 
      const query7 = "SELECT SUM(salesPrice) AS totalSales from sales";
      // Query for: total shipping costs
      const query8 = "SELECT SUM(shippingCost + customBoxCost + oldMaterialOffset) AS totalShipping from sales";
      // Query for adding all of the Etsy Fees
      const query9 = "SELECT SUM(etsyTransactionFee + etsyMarketingFee + etsyProcessingFee + etsyListingFee + etsyShippingFee) AS totalEtsyFees from sales";
      // Query for counting the number of sales
      const query10 = "SELECT COUNT(*) FROM sales as totalSalesCount";
      // Query for adding all of the Supplies costs
      const query11 = "SELECT SUM(itemTotalCost) AS suppliesTotal from supplies";
      // Query for adding all of the Advertising costs
      const query12 = "SELECT SUM(amtCharged) AS advertsTotal from adverts";
  
      const [result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14] = await Promise.all([
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
        }),
        sequelize.query(query7, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query8, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query9, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query10, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query11, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query12, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query13, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query14, {
          type: sequelize.QueryTypes.SELECT,
        })
      ]);
  
      res.json({ 
        // 2023
        totalSales2023: result1[0].totalSales2023, 
        totalShipping2023: result2[0].totalShipping2023, 
        totalEtsyFees2023: result3[0].totalEtsyFees2023, 
        suppliesTotal2023: result5[0].suppliesTotal2023,
        advertsTotal2023: result6[0].advertsTotal2023,
        // all time 
        totalSales: result7[0].totalSales, 
        totalShipping: result8[0].totalShipping, 
        totalEtsyFees: result9[0].totalEtsyFees, 
        suppliesTotal: result11[0].suppliesTotal,
        advertsTotal: result12[0].advertsTotal,
        // counts
        gohanCount: result13[0],
        totalSalesCount: result10[0],
        patternCount: result14[0],
        totalSalesCount2023: result4[0]});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
