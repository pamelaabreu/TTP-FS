// Dependencies
const express = require("express");

// Database Services
const userServices = require("../services/users");

// Initialize User Express Router
const userRouter = express.Router();

// POST - Create user
userRouter.post("/", (req, res, next) => {
  const { name, email, firebase_uid } = req.body;
  const message = `Successfully recieved name:${name}, email:${email}, firebase_uid:${firebase_uid}.`;
  res.status(200);
  res.json({
    message
  });
});

// GET - Read all user information by email
userRouter.get("/userInfo/:email", (req, res, next) => {
  const { email } = req.params;
  const message = `Successfully recieved email:${email} to get all user information.`;
  res.status(200);
  res.json({
    message
  });
});

// GET - Read user's cash balance information by email
userRouter.get("/userCashBalance/:email", (req, res, next) => {
  const { email } = req.params;
  const message = `Successfully recieved email:${email} to get cash balance.`;
  res.status(200);
  res.json({
    message
  });
});

module.exports = userRouter;
