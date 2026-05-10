/*
======================================
; Title: sale.routes.js
; Author: Red
; Date Created: 12 July 2023
; Last Updated: 26 August 2023
; Description: This code sets up the Sale routes
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

// exports
module.exports = app => {
    const sales = require("../controllers/sale.controller.js");
    const auth = require("../middleware/authMiddleware.js");
  
    var router = require("express").Router();
  
    // Create a new Sale
    router.post("/", auth, sales.create);
  
    // Retrieve all Sales
    router.get("/", sales.findAll);
  
    // Retrieve all published Sales
    router.get("/published", sales.findAllPublished);
  
    // Retrieve a single Sale with id
    router.get("/:id", sales.findOne);
  
    // Update a Sale with id
    router.put("/:id", auth, sales.update);
  
    // Delete a Sale with id
    router.delete("/:id", auth, sales.delete);

    // Delete all Sales
    router.delete("/", auth, (req, res, next) => {
      if ((!req.body || req.body.confirm !== "DELETE_ALL")) {
        return res.status(400).json({
          message: "Confirmation required"
        });
      }
      next();
    }, sales.deleteAll);

    // TEST TEST TEST 
    // Retrieve Sales Data (test)
    router.get("/", sales.totalSales);

  app.use('/api/sales', router);
};