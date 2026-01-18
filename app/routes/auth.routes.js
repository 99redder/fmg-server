/*
======================================
; Title: auth.routes.js
; Author: Chris Gorham
; Date Created: 18 January 2026
; Description: Authentication routes for login validation
;=====================================
*/

module.exports = app => {
  const router = require("express").Router();

  router.post('/login', (req, res) => {
    const { loginCode } = req.body;
    const validPassword = process.env.LOGIN_PASSWORD || 'localDevPassword';

    if (loginCode === validPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid login code' });
    }
  });

  app.use('/api/auth', router);
};
