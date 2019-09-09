// Services
import IEXAPIService from "../services/IEXAPI";

// Inital shares service object
const sharesUtils = {};

// Convert shares to reflect current price
sharesUtils.convertSharesToCurrentPrice = (ticket, shares_amount) => {
  let currentPrice = 0;

  IEXAPIService.readStockInformation(ticket).then(
    ({ lastSalePrice }) => (currentPrice = shares_amount * lastSalePrice)
  );

  return currentPrice;
};

// Rate current price of shares against opening price
sharesUtils.matchAgainstOpeningPrice = (currentPrice, symbol) => {
    IEXAPIService.readOpeningPrice(symbol).then(data => {
            console.log("readOpeningPrice data:", data)
    //         "priceType": "Open",
    // "price": 1.05,
    })
};

// Add total amount of all shares

// Convert shares array to reflect current price and performance
// sharesArray.map(value => {
//   const { ticket, shares_amount } = value;

//   return { ticket, shares_amount, currentPrice };
// });

// .then(({lastSalePrice}) => {
//     console.log("readStockInformation data:", lastSalePrice)
//     return IEXAPIService.readOpeningPrice("AA")
// })
// .then((data) => {
//     console.log("readOpeningPrice data:", data)
//     return IEXAPIService.readAllSymbols()
// })
// .then((data) => {
//     console.log("readAllSymbols data:", data)
// })

export default sharesUtils;
