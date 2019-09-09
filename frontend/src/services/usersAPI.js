// Dependencies
import axios from "axios";

// Base Url for Express API Endpoint
import baseUrl from "./backendUrlConnect";

// Inital transactions service object
const usersAPIService = {};

// Read user's cash balance
usersAPIService.readAllUserCashBalance = email =>
  axios.get(`${baseUrl}/user/userCashBalance/${email}`).then(res => res.data);

export default usersAPIService;
