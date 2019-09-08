// Dependencies
const express = require("express");

// Initialize User Express Router
const userRouter = express.Router();

// POST - Create user
userRouter.post("/", (req, res, next) => {
    const { name, email, firebase_uid } = req.body;
    const message = `Successfully recieved name:${name}, email:${email}, firebase_uid:${firebase_uid}.`
    res.status(200);
    res.json({
        message 
    });
});

// READ - Read all user information by email

// READ - Read user's cash balance information by email

module.exports = userRouter;