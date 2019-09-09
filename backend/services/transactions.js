// Database Connection
const { db } = require("./dbConnect");

// Database Services
const userService = require("./users");

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
  return userService.readAllUserInfo(email).then(({ id }) => {
    // Second create the transaction

    const sql = `
        INSERT INTO user_transactions (ticket, shares_amount, transaction_price, user_id) VALUES
        ($[ticket], $[shares_amount], $[transaction_price], $[user_id]) RETURNING id;
        `;

    return db.one(sql, {
      ticket,
      shares_amount,
      transaction_price,
      user_id: id
    });
  });

  // update share || create new share
  // update user's cash balance
};

// Read all transactions

module.exports = transactionService;
