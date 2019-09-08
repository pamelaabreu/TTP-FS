DROP DATABASE IF EXISTS stockportfolio;
CREATE DATABASE stockportfolio;

\c  stockportfolio;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    cash_balance INT NOT NULL
);

CREATE TABLE user_shares (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    ticket VARCHAR NOT NULL,
    shares_amount INT NOT NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE TABLE user_transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ticket VARCHAR NOT NULL,
    transaction_price INT NOT NULL,
    shares_amount INT NOT NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

-- Insert into the users table a default user for testing purposes
INSERT INTO users (name, email, firebase_uid, cash_balance) VALUES
("Default", "default@testing.com", "wzXjVkjADRPzXgZtnh304vh8u1f2", 5000);