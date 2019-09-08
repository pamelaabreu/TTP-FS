// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Intialize Express App
const app = express();

// Routers File Imports
const userRouter = require("./routes/users");

// Middleware
// Enable All CORS Requests
app.use(cors());

// Parses application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parses application/json
app.use(bodyParser.json());

// Endpoints
// Testing endpoint
app.use("/ping", (req, res) => {
  res.json({ pong: true });
});

// User endpoint
app.use("/user", userRouter);

module.exports = { app };
