/*
======================================
; Title: advert.routes.js
; Author: Red
; Date Created: 05 August 2023
; Last Updated: 26 August 2023
; Description: This code sets up the Advertising routes
; Sources Used:
; BezKoder Angular 10 CRUD Application Tutorial: https://www.bezkoder.com/angular-10-node-js-express-mysql/
;=====================================
*/

//exports
module.exports = app => {
    const advertising = require("../controllers/advert.controller.js");
    const auth = require("../middleware/authMiddleware.js");
  
    var router = require("express").Router();
  
    // Create a new Advert
    router.post("/", auth, advertising.create);
  
    // Retrieve all Adverts
    router.get("/", advertising.findAll);
  
    // Retrieve all published Adverts
    router.get("/published", advertising.findAllPublished);
  
    // Retrieve a single Advert with id
    router.get("/:id", advertising.findOne);
  
    // Update an Advert with id
    router.put("/:id", auth, advertising.update);
  
    // Delete an Advert with id
    router.delete("/:id", auth, advertising.delete);

    // Delete all Adverts
  router.delete("/", auth, (req, res, next) => {
    if (req.query.confirm !== "DELETE_ALL") {
      return res.status(400).json({
        message: "Bulk delete requires ?confirm=DELETE_ALL query parameter."
      });
    }
    next();
  }, advertising.deleteAll);

  app.use('/api/advertising', router);
};