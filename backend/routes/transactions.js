// Dependencies
const express = require("express");

// Database Services
const transactionService = require("../services/transactions");

// Initialize Transactions Express Router
const transactionsRouter = express.Router();

// POST - Create transaction
transactionsRouter.post("/", (req, res) => {
  const { email, ticket, shares_amount, transaction_price } = req.body;

  transactionService
    .create(email, ticket, shares_amount, transaction_price)
    .then(data => {
      const message = `Successfully recieved email: ${email}, ticket: ${ticket}, shares_amount: ${shares_amount}, transaction_price: ${transaction_price}.`;

      res.status(200);
      res.json({
        data,
        message
      });
    });
});

// GET - Read all of a user's transactions
transactionsRouter.get("/allUserTransactions/:email", (req, res) => {
  const { email } = req.params;
  const message = `Successfully recieved email: ${email} for all transactions.`;

  res.status(200);
  res.json({
    message
  });
});

module.exports = transactionsRouter;
