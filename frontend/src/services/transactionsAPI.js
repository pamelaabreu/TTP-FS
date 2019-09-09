// Dependencies
import axios from "axios";

// Base Url for Express API Endpoint
import baseUrl from "./backendUrlConnect";

// Inital transactions service object
const transactionsAPIService = {};

// Read all transactions
transactionsAPIService.readAllUserTransaction = email =>
  axios
    .get(`${baseUrl}/transactions/allUserTransactions/${email}`)
    .then(res => res.data);

export default transactionsAPIService;
