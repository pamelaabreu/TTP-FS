// Dependencies
const express = require("express");

// Database Services
const userService = require("../services/users");

// Initialize User Express Router
const userRouter = express.Router();

// POST - Create user
userRouter.post("/", (req, res, next) => {
  const { name, email, firebase_uid } = req.body;

  userService
    .create(name, email, firebase_uid)
    .then(data => {
      const message = `Successfully recieved name:${name}, email:${email}, firebase_uid:${firebase_uid}. Created id: ${data.id} with cash balance of ${data.cash_balance}.`;

      res.status(200);
      res.json({
        message,
        data
      });
    })
    .catch(err => {
      next(err);
    });
});

// GET - Read all user information by email
userRouter.get("/userInfo/:email", (req, res, next) => {
  const { email } = req.params;

  userService
    .readAllUserInfo(email)
    .then(data => {
      const message = `Successfully recieved email:${email} to get all user information.`;

      res.status(200);
      res.json({
        data,
        message
      });
    })
    .catch(err => {
      next(err);
    });
});

// GET - Read user's cash balance information by email
userRouter.get("/userCashBalance/:email", (req, res, next) => {
  const { email } = req.params;

  userService
    .readUserCashBalance(email)
    .then(data => {
      const message = `Successfully recieved email:${email} to get cash balance.`;

      res.status(200);
      res.json({
        data,
        message
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = userRouter;
