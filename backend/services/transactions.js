// Database Connection
const { db } = require("./dbConnect");

// Database Services
const userService = require("./users");
const shareService = require("./shares");

// Inital transaction service object
const transactionService = {};

// Create transaction
transactionService.create = (
  email,
  ticket,
  shares_amount,
  transaction_price
) => {
  // First read the user email and return the user id associated with the email
  const createTransaction = userService
    .readAllUserInfo(email)
    .then(({ id }) => {
      // Second create the transaction

      const sql = `
        INSERT INTO user_transactions (ticket, shares_amount, transaction_price, user_id) VALUES
        ($[ticket], $[shares_amount], $[transaction_price], $[user_id]) RETURNING id, user_id, ticket, shares_amount;
        `;

      return db.one(sql, {
        ticket,
        shares_amount,
        transaction_price,
        user_id: id
      });
    });

  return createTransaction;
};

// Read all transactions
transactionService.readAllUserTransaction = email => {
  // First read the user email and return the user id associated with the email
  return userService.readAllUserInfo(email).then(({ id }) => {
    // Second read all of the user's transactions
    const sql = `
        SELECT
            user_transactions.*
        FROM
            user_transactions
        WHERE
            user_id = $[id]
        ORDER BY 
            user_transactions.created_at DESC
        `;

    return db.any(sql, { id });
  });
};

module.exports = transactionService;
