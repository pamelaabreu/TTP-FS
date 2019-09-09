// Database Connection
const { db } = require("./dbConnect");

// Database Services
const userService = require("./users");

// Inital shares service object
const shareService = {};

// Create shares
shareService.create = (ticket, shares_amount, user_id) => {
  const sql = `
    INSERT INTO user_shares (ticket, shares_amount, user_id) VALUES
    ($[ticket], $[shares_amount], $[user_id]) RETURNING ticket, shares_amount;
    `;

  return db.one(sql, { ticket, shares_amount, user_id });
};

// Update shares
shareService.updateShare = (ticket, shares_amount, user_id) => {
    const sql = `
    UPDATE user_shares
    SET
        shares_amount = $[shares_amount]
    WHERE
        user_id=$[user_id] AND ticket=$[ticket]
    RETURNING ticket, shares_amount;
    `;

    return db.one(sql, { ticket, shares_amount, user_id });
  };

// Read share
shareService.readShare = (ticket, user_id) => {
  const sql = `
    SELECT
        user_shares.*
    FROM
        user_shares
    WHERE
        ticket = $[ticket] AND user_id = $[user_id]
    `;

  return db.one(sql, { ticket, user_id });
};

// Read all users's shares

module.exports = shareService;
