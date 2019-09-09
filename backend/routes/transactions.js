// Dependencies
const express = require("express");

// Database Services
const transactionService = require("../services/transactions");

// Initialize Transactions Express Router
const transactionsRouter = express.Router();

// POST - Create transaction
transactionsRouter.post("/", (req, res, next) => {
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
    })
    .catch(err => {
      next(err);
    });
});

// GET - Read all of a user's transactions
transactionsRouter.get("/allUserTransactions/:email", (req, res, next) => {
  const { email } = req.params;

  transactionService
    .readAllUserTransaction(email)
    .then(data => {
      const message = `Successfully recieved email: ${email} for all transactions.`;

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

module.exports = transactionsRouter;
