// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Intialize Express App
const app = express();

// Route File Imports

// Middleware
// Enable All CORS Requests
app.use(cors());

// Parses application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parses application/json
app.use(bodyParser.json());

// Routes
// Testing route
app.use("/ping", (req, res) => {
    res.json({"pong": true})
});