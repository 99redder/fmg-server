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
  
    var router = require("express").Router();
  
    // Create a new Supply
    router.post("/", supplies.create);
  
    // Retrieve all Supplies
    router.get("/", supplies.findAll);
  
    // Retrieve all published Supplies
    router.get("/published", supplies.findAllPublished);
  
    // Retrieve a single Supply with id
    router.get("/:id", supplies.findOne);
  
    // Update a Supply with id
    router.put("/:id", supplies.update);
  
    // Delete a Supply with id
    router.delete("/:id", supplies.delete);

    // Delete all Supplies
  router.delete("/", supplies.deleteAll);

  app.use('/api/supplies', router);
};