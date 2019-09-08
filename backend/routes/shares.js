// Dependencies
const express = require("express");

// Initialize Shares Express Router
const sharesRouter = express.Router();

// GET - Read all shares
sharesRouter.get("/all/:email", (req, res) => {
  const { email } = req.params;
  const message = `Successfully recieved email: ${email} for all shares.`;

  res.status(200);
  res.json({
    message
  });
});

module.exports = sharesRouter;
