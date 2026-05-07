/*
======================================
; Title: auth.routes.js
; Author: Red
; Date Created: 18 January 2026
; Description: Authentication routes for login validation
;=====================================
*/

module.exports = app => {
  const rateLimit = require("express-rate-limit");
  const router = require("express").Router();

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many login attempts. Please try again later." }
  });

  router.post('/login', loginLimiter, (req, res) => {
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
