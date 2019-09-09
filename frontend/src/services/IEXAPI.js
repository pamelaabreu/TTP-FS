// Dependencies
import axios from "axios";

// Base Url for IEX API Endpoint
const baseUrl = "https://api.iextrading.com/1.0";

// Inital IEX API service object
const IEXAPIService = {};

// GET - Symbols
IEXAPIService.readAllSymbols = () =>
  axios.get(`${baseUrl}/ref-data/symbols`).then(res => res.data);

// GET - Opening Price
IEXAPIService.readOpeningPrice = symbol =>
  axios
    .get(`${baseUrl}/deep/official-price?symbols=${symbol.toUpperCase()}`)
    .then(res => res.data);

// GET - Current Stock Information
IEXAPIService.readStockInformation = symbol =>
  axios
    .get(`${baseUrl}/deep?symbols=${symbol.toUpperCase()}`)
    .then(res => res.data);

export default IEXAPIService;
