/*
======================================
; Title: query.controller.js
; Author: Chris Gorham
; Date Created: 26 August 2023
; Last Updated: 02 December 2023
; Description: This code sets up the Query controller
; Sources Used: N/A
;=====================================
*/

// imports
const { sequelize } = require('../models/index');

exports.getMultipleQueries = async (req, res) => {
    try {

// 2024 Stat Queries

      // Query for: total gross sales for all of 2024
      const query12024 = "SELECT SUM(salesPrice) AS totalSales2024 from sales where salesDate between '2024-01-01' and '2024-12-31'";
      // Query for: total shipping costs for all of 2024
      const query22024 = "SELECT SUM(shippingCost + customBoxCost + oldMaterialOffset) AS totalShipping2024 from sales where salesDate between '2024-01-01' and '2024-12-31'";
      // Query for adding all of the Etsy Fees for all of 2024
      const query32024 = "SELECT SUM(etsyTransactionFee + etsyMarketingFee + etsyProcessingFee + etsyListingFee + etsyShippingFee) AS totalEtsyFees2024 from sales where salesDate between '2024-01-01' and '2024-12-31'";
      // Query for counting the number of sales for all of 2024
      const query42024 = "SELECT COUNT(*) FROM sales as totalSalesCount2024 where salesDate between '2024-01-01' and '2024-12-31'";
      // Query for adding all of the Supplies costs for all of 2024
      const query52024 = "SELECT SUM(itemTotalCost) AS suppliesTotal2024 from supplies where purchaseDate between '2024-01-01' and '2024-12-31'";
      // Query for adding all of the Advertising costs for all of 2024
      const query62024 = "SELECT SUM(amtCharged) AS advertsTotal2024 from adverts where dateCharged between '2024-01-01' and '2024-12-31'";

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

      // Gohan Hats

      // Counts all Gohan Hat sales (every size) for all-time
      const query13 = "SELECT COUNT(*) FROM sales as gohanCount where itemDescription LIKE 'Baby Gohan Hat (%'";
      // Counts all Gohan Hat (0-3 months) sales for all-time
      const query13a = "SELECT COUNT(*) FROM sales as gohan03Count where itemDescription LIKE 'Baby Gohan Hat (0-3 months)%'";
      // Counts all Gohan Hat (3-6 months) sales for all-time
      const query13b = "SELECT COUNT(*) FROM sales as gohan36Count where itemDescription LIKE 'Baby Gohan Hat (3-6 months)%'";
      // Counts all Gohan Hat (6-9 months) sales for all-time
      const query13c = "SELECT COUNT(*) FROM sales as gohan69Count where itemDescription LIKE 'Baby Gohan Hat (6-9 months)%'";
      // Counts all Gohan Hat (9-12 months) sales for all-time
      const query13d = "SELECT COUNT(*) FROM sales as gohan912Count where itemDescription LIKE 'Baby Gohan Hat (9-12 months)%'";
      // Counts all Gohan Hat (12-18 months) sales for all-time
      const query13e = "SELECT COUNT(*) FROM sales as gohan1218Count where itemDescription LIKE 'Baby Gohan Hat (12-18 months)%'";
      // Counts all Gohan Hat (18-24 months) sales for all-time
      const query13f = "SELECT COUNT(*) FROM sales as gohan1824Count where itemDescription LIKE 'Baby Gohan Hat (18-24 months)%'";

      // Gohan Hat Patterns

      // Counts all Gohan Hat Pattern sales for all-time
      const query14 = "SELECT COUNT(*) FROM sales as patternCount where itemDescription LIKE 'Baby Gohan Hat Pattern%'";

      // Trunks Diaper Sets

      // Counts all Trunks Diaper Sets (every size) for all-time
      const query15 = "SELECT COUNT(*) FROM sales as trunksCount where itemDescription LIKE 'Trunks Diaper Set (%'";
      // Counts all Trunks Diaper Sets (0-3 months) for all-time
      const query15a = "SELECT COUNT(*) FROM sales as trunks03Count where itemDescription LIKE 'Trunks Diaper Set (0-3 months)%'";
      // Counts all Trunks Diaper Sets (3-6 months) for all-time
      const query15b = "SELECT COUNT(*) FROM sales as trunks36Count where itemDescription LIKE 'Trunks Diaper Set (3-6 months)%'";
      // Counts all Trunks Diaper Sets (6-9 months) for all-time
      const query15c = "SELECT COUNT(*) FROM sales as trunks69Count where itemDescription LIKE 'Trunks Diaper Set (6-9 months)%'";

      // Majin Buu Diaper Sets

      // Counts all Majin Buu Diaper Sets (every size) for all-time
      const query16 = "SELECT COUNT(*) FROM sales as majinCount where itemDescription LIKE 'Majin Buu Diaper Set (%'";
      // Counts all Majin Buu Diaper Sets (0-3 months) for all-time
      const query16a = "SELECT COUNT(*) FROM sales as majin03Count where itemDescription LIKE 'Majin Buu Diaper Set (0-3 months)%'";
      // Counts all Majin Buu Diaper Sets (3-6 months) for all-time
      const query16b = "SELECT COUNT(*) FROM sales as majin36Count where itemDescription LIKE 'Majin Buu Diaper Set (3-6 months)%'";
      // Counts all Majin Buu Diaper Sets (6-9 months) for all-time
      const query16c = "SELECT COUNT(*) FROM sales as majin69Count where itemDescription LIKE 'Majin Buu Diaper Set (6-9 months)%'";

      // Goku Baby Hats
      // Counts all Baby Goku Hat (every size) for all-time
      const query17 = "SELECT COUNT(*) FROM sales as gokuHatCount where itemDescription LIKE 'Goku Baby Hat (%'";
      // Counts all Baby Goku Hat (0-3 months) for all-time
      const query17a = "SELECT COUNT(*) FROM sales as gokuHat03Count where itemDescription LIKE 'Goku Baby Hat (0-3 months)%'";
      // Counts all Baby Goku Hat (3-6 months) for all-time
      const query17b = "SELECT COUNT(*) FROM sales as gokuHat36Count where itemDescription LIKE 'Goku Baby Hat (3-6 months)%'";
      // Counts all Baby Goku Hat (6-9 months) for all-time
      const query17c = "SELECT COUNT(*) FROM sales as gokuHat69Count where itemDescription LIKE 'Goku Baby Hat (6-9 months)%'";

      // Luffy Hats
      // Counts all Luffy Hat sales (every size) for all-time
      const query18 = "SELECT COUNT(*) FROM sales as luffyCount where itemDescription LIKE 'Luffy Baby Straw Hat (%'";
      // Counts all Luffy Hat (0-3 months) sales for all-time
      const query18a = "SELECT COUNT(*) FROM sales as luffy03Count where itemDescription LIKE 'Luffy Baby Straw Hat (0-3 months)%'";
      // Counts all Luffy Hat (3-6 months) sales for all-time
      const query18b = "SELECT COUNT(*) FROM sales as luffy36Count where itemDescription LIKE 'Luffy Baby Straw Hat (3-6 months)%'";
      // Counts all Luffy Hat (6-9 months) sales for all-time
      const query18c = "SELECT COUNT(*) FROM sales as luffy69Count where itemDescription LIKE 'Luffy Baby Straw Hat (6-9 months)%'";
      // Counts all Luffy Hat (9-12 months) sales for all-time
      const query18d = "SELECT COUNT(*) FROM sales as luffy912Count where itemDescription LIKE 'Luffy Baby Straw Hat (9-12 months)%'";
      // Counts all Luffy Hat (12-18 months) sales for all-time
      const query18e = "SELECT COUNT(*) FROM sales as luffy1218Count where itemDescription LIKE 'Luffy Baby Straw Hat (12-18 months)%'";
      // Counts all Luffy Hat (18-24 months) sales for all-time
      const query18f = "SELECT COUNT(*) FROM sales as luffy1824Count where itemDescription LIKE 'Luffy Baby Straw Hat (18-24 months)%'";

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
  
      const [result1, result2, result3, result4, result5, result6, result12024, result22024, result32024, result42024, result52024, result62024, result7, result8, result9, result10, result11, result12, result13, result13a, result13b, result13c, result13d, result13e, result13f, result14, result15, result15a, result15b, result15c, result16, result16a, result16b, result16c, result17, result17a, result17b, result17c, result18, result18a, result18b, result18c, result18d, result18e, result18f] = await Promise.all([
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
        sequelize.query(query12024, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query22024, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query32024, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query42024, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query52024, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query62024, {
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
        sequelize.query(query13a, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query13b, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query13c, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query13d, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query13e, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query13f, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query14, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query15, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query15a, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query15b, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query15c, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query16, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query16a, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query16b, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query16c, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query17, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query17a, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query17b, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query17c, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18a, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18b, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18c, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18d, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18e, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(query18f, {
          type: sequelize.QueryTypes.SELECT,
        }),
      ]);
  
      res.json({ 
        // 2024
        totalSales2024: result12024[0].totalSales2024, 
        totalShipping2024: result22024[0].totalShipping2024, 
        totalEtsyFees2024: result32024[0].totalEtsyFees2024, 
        suppliesTotal2024: result52024[0].suppliesTotal2024,
        advertsTotal2024: result62024[0].advertsTotal2024,
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
        gohan03Count: result13a[0],
        gohan36Count: result13b[0],
        gohan69Count: result13c[0],
        gohan912Count: result13d[0],
        gohan1218Count: result13e[0],
        gohan1824Count: result13f[0],
        totalSalesCount: result10[0],
        patternCount: result14[0],
        trunksCount: result15[0],
        trunks03Count: result15a[0],
        trunks36Count: result15b[0],
        trunks69Count: result15c[0],
        majinCount: result16[0],
        majin03Count: result16a[0],
        majin36Count: result16b[0],
        majin69Count: result16c[0],
        gokuHatCount: result17[0],
        gokuHat03Count: result17a[0],
        gokuHat36Count: result17b[0],
        gokuHat69Count: result17c[0],
        luffyCount: result18[0],
        luffy03Count: result18a[0],
        luffy36Count: result18b[0],
        luffy69Count: result18c[0],
        luffy912Count: result18d[0],
        luffy1218Count: result18e[0],
        luffy1824Count: result18f[0],
        totalSalesCount2024: result42024[0],
        totalSalesCount2023: result4[0]});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };