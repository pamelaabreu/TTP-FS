// Intialize Environment Variables
let pgp = null;
let db = null;

// Conditional to connect to database
if (!pgp) {
    pgp = require('pg-promise')({});  
    db = pgp(process.env.DATABASE_URL || 'postgres://localhost/stockportfolio'); 
}

module.exports = { db };