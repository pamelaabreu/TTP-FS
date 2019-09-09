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
  // Variable to be used if user has no existing share
  let transactionInformation = null;

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

  // Second, ff user already has shares, update the shares, else create new share
  const updateOrCreateUserShares = createTransaction
    .then(({ user_id, ticket, shares_amount }) => {
      transactionInformation = { user_id, ticket, shares_amount };
      return shareService.readShare(ticket, user_id);
    })
    .then(
      ({ user_id, ticket, shares_amount }) => {
        // Update user's share
        const newSharesAmount = shares_amount + transactionInformation.shares_amount;

        return shareService.updateShare(ticket, newSharesAmount, user_id);
      },
      error => {
        // Create new share
        const { ticket, shares_amount, user_id } = transactionInformation;
        return shareService.create(ticket, shares_amount, user_id);
      }
    );

  // Third, update user's cash balance
  userService.updateUserCashBalance(email, transaction_price);

  return updateOrCreateUserShares;
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
