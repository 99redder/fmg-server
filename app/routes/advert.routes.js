/*
======================================
; Title: advert.routes.js
; Author: Chris Gorham
; Date Created: 05 August 2023
; Last Updated: 05 August 2023
; Description: This code sets up the Advertising routes
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

module.exports = app => {
    const advertising = require("../controllers/advert.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Advert
    router.post("/", advertising.create);
  
    // Retrieve all Adverts
    router.get("/", advertising.findAll);
  
    // Retrieve all published Adverts
    router.get("/published", advertising.findAllPublished);
  
    // Retrieve a single Advert with id
    router.get("/:id", advertising.findOne);
  
    // Update an Advert with id
    router.put("/:id", advertising.update);
  
    // Delete an Advert with id
    router.delete("/:id", advertising.delete);

    // Delete all Adverts
  router.delete("/", advertising.deleteAll);

  app.use('/api/advertising', router);
};