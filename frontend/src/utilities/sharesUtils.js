// Services
import IEXAPIService from "../services/IEXAPI";

// Inital shares service object
const sharesUtils = {};

// Convert shares to reflect current price
sharesUtils.convertSharesToCurrentPrice = (ticket, shares_amount) =>
  IEXAPIService.readStockInformation(ticket).then(
    ({ lastSalePrice }) => Math.round(shares_amount * lastSalePrice)
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
      const openingPriceValue = price * shares_amount;
      const currentPriceValue = currentPrice;

      if (openingPriceValue > currentPriceValue) return { color: "text-danger" };
      else if (openingPriceValue < currentPriceValue) return { color: "text-success" };
      else return { color: "text-secondary" };
    } else {
      return { color: "text-secondary" };
    }
  });
};

// Add total amount of all shares
sharesUtils.addTotal = data => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].currentPrice;
  }

  return sum;
};

// Convert shares array to reflect current price and performance
sharesUtils.convertSharesArray = data => {
  // Resolve array of promises
  return Promise.all(
    data.map(async value => {
      const { ticket, shares_amount } = value;
      try {
        // Get current price for each share amount
        const currentPrice = await sharesUtils.convertSharesToCurrentPrice(
          ticket,
          shares_amount
        );

        // Rate performances
        const performance = await sharesUtils.matchAgainstOpeningPrice(
          currentPrice,
          ticket,
          shares_amount
        );

        return { ticket, shares_amount, currentPrice, performance };
      } catch (error) {
        console.log("Error:", error);
      }
    })
  );
};

export default sharesUtils;
