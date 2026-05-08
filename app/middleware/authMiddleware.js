/*
======================================
; Title: authMiddleware.js
; Author: Red
; Date Created: 08 May 2026
; Description: Verifies JWT bearer tokens for protected API routes
;=====================================
*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[0] === "Bearer" ? header.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
