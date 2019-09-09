// Services
import IEXAPIService from "../services/IEXAPI";

// Inital shares service object
const sharesUtils = {};

// Convert shares to reflect current price
sharesUtils.convertSharesToCurrentPrice = (ticket, shares_amount) =>
  IEXAPIService.readStockInformation(ticket).then(
    ({ lastSalePrice }) => shares_amount * lastSalePrice
  );

// Rate current price of shares against opening price
sharesUtils.matchAgainstOpeningPrice = (
  currentPrice,
  symbol,
  shares_amount
) => {
  return IEXAPIService.readOpeningPrice(symbol).then(data => {
    if (data.price) {
      const price = data.price;
      const openingPriceValue = parseInt(price * shares_amount);
      const currentPriceValue = parseInt(currentPrice);

      if (openingPriceValue > currentPriceValue) return { color: "red" };
      else if (openingPriceValue < currentPriceValue) return { color: "green" };
      else return { color: "grey" };
    } else {
      return { color: "grey" };
    }
  });
};

// Add total amount of all shares

// Convert shares array to reflect current price and performance
sharesUtils.convertSharesArray = data => {
  return data.map(value => {
    const { ticket, shares_amount } = value;
    let currentPrice = 0;
    let performance = null;

    // Get current price for each share amount
    const getCurrentPrice = sharesUtils.convertSharesToCurrentPrice(
      ticket,
      shares_amount
    );

    // Rate performances
    getCurrentPrice
      .then(convertedCurrentPrice => {
        // Set current price
        currentPrice = parseInt(convertedCurrentPrice);
        return sharesUtils.matchAgainstOpeningPrice(
          convertedCurrentPrice,
          ticket,
          shares_amount
        );
      })
      .then(matchPerformance => {
        // Set performance
        performance = matchPerformance;
      });

    return { ticket, shares_amount, currentPrice, performance };
  });
};

export default sharesUtils;
