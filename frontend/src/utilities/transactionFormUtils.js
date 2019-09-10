// Services
import IEXAPIService from "../services/IEXAPI";
import sharesUtils from "./sharesUtils";

// Inital shares service object
const transactionFormUtils = {};

// Check valid ticket symbol
transactionFormUtils.checkValidTicket = async ticket => {
  const isValid = await IEXAPIService.readAllSymbols().then(data => {
    for (let i = 0; i < data.length; i++) {
      const value = data[i];
      if (value.symbol.toUpperCase() === ticket.toUpperCase()) return true;
    }

    return false;
  });

  return isValid;
};

// Get current price of ticket
transactionFormUtils.getTicketPrice = async (ticket, shares_amount) => {
  const currentPrice = await sharesUtils.convertSharesToCurrentPrice(
    ticket,
    shares_amount
  );

  return currentPrice;
};

// Check if quantity is whole number
transactionFormUtils.isWholeNum = quantity => {
  if (parseInt(quantity) === 0) return false;
  if (quantity.includes(".")) return false;
  else return true;
};

// Check if cashBalance enough
transactionFormUtils.isEnoughCash = (cashBalance, ticketAmount) => {
    const subtractSum = cashBalance - ticketAmount;
    if(subtractSum >= 1) return true;
    else return false;
};

export default transactionFormUtils;
