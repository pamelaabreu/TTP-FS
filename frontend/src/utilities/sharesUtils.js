// Services
import IEXAPIService from "../services/IEXAPI";

// Inital shares service object
const sharesUtils = {};

// Convert shares to reflect current price
sharesUtils.convertSharesToCurrentPrice = ticket => {
  let currentPrice = 0;

  IEXAPIService.readStockInformation(ticket).then(
    ({ lastSalePrice }) => (currentPrice = ticket * lastSalePrice)
  );

  return currentPrice;
};

// Rate current price of shares against opening price

// Add total amount of all shares

// Convert shares array to reflect current price and performance

export default sharesUtils;
