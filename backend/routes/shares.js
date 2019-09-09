// Dependencies
const express = require("express");

// Database Services
const shareService = require("../services/shares");

// Initialize Shares Express Router
const sharesRouter = express.Router();

// GET - Read all shares
sharesRouter.get("/all/:email", (req, res, next) => {
  const { email } = req.params;

  shareService
    .readAllShares(email)
    .then(data => {
      const message = `Successfully recieved email: ${email} for all shares.`;

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

module.exports = sharesRouter;
