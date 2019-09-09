// Database Connection
const { db } = require("./dbConnect");

// Inital user service object
const userService = {};

// Create user
userService.create = (name, email, firebase_uid) => {
  const cash_balance = 5000;
  const sql = `
    INSERT INTO users (name, email, firebase_uid, cash_balance) VALUES
    ($[name], $[email], $[firebase_uid], $[cash_balance]) RETURNING id, cash_balance;`;

  return db.one(sql, { name, email, firebase_uid, cash_balance });
};

// Read all user information by email
userService.readAllUserInfo = email => {
  const sql = `
    SELECT
        users.*
    FROM
        users
    WHERE
        users.email = $[email]
    `;

  return db.one(sql, { email });
};

// Read user's cash balance information by email

module.exports = userService;
