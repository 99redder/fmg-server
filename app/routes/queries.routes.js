/*
======================================
; Title: queries.routes.js
; Author: Chris Gorham
; Date Created: 26 August 2023
; Last Updated: 26 August 2023
; Description: This code sets up the Queries routes
; Sources Used: N/A
;=====================================
*/

// exports
module.exports = app => {
    const queryController = require("../controllers/query.controller.js");
  
    var router = require("express").Router();
  
    router.get('/multipleQueries', queryController.getMultipleQueries);

  app.use('/queries', router);
};