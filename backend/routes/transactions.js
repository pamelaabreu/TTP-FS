// Dependencies
const express = require("express");

// Initialize Transactions Express Router
const transactionsRouter = express.Router();

// POST - Create transaction
transactionsRouter.post("/", (req, res) => {
  const { email, ticket, shares_amount, transaction_price } = req.body;
  const message = `Successfully recieved email: ${email}, ticket: ${ticket}, shares_amount: ${shares_amount}, transaction_price: ${transaction_price}.`;

  res.status(200);
  res.json({
    message
  });
});

// GET - Read all transactions
transactionsRouter.get("/:email", (req, res) => {
    const { email } = req.params;
    const message = `Successfully recieved email: ${email} for all transactions.`;
  
    res.status(200);
    res.json({
      message
    });
  });

module.exports = transactionsRouter;
