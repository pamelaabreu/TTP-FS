// Dependencies
import axios from "axios";

// Base Url for Express API Endpoint
import baseUrl from "./backendUrlConnect";

// Inital shares service object
const sharesAPIService = {};

// Read all of user's shares
sharesAPIService.readAllShares = email =>
  axios.get(`${baseUrl}/shares/all/${email}`).then(res => res.data);

export default sharesAPIService;
