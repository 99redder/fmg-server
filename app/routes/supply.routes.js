/*
======================================
; Title: supply.routes.js
; Author: Red
; Date Created: 12 July 2023
; Last Updated: 26 August 2023
; Description: This code sets up the Supply routes
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

// exports
module.exports = app => {
    const supplies = require("../controllers/supply.controller.js");
    const auth = require("../middleware/authMiddleware.js");
  
    var router = require("express").Router();
  
    // Create a new Supply
    router.post("/", auth, supplies.create);
  
    // Retrieve all Supplies
    router.get("/", supplies.findAll);
  
    // Retrieve all published Supplies
    router.get("/published", supplies.findAllPublished);
  
    // Retrieve a single Supply with id
    router.get("/:id", supplies.findOne);
  
    // Update a Supply with id
    router.put("/:id", auth, supplies.update);
  
    // Delete a Supply with id
    router.delete("/:id", auth, supplies.delete);

    // Delete all Supplies
  router.delete("/", auth, (req, res, next) => {
    if ((!req.body || req.body.confirm !== "DELETE_ALL")) {
      return res.status(400).json({
        message: "Confirmation required"
      });
    }
    next();
  }, supplies.deleteAll);

  app.use('/api/supplies', router);
};