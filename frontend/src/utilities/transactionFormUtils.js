// Services
import IEXAPIService from "../services/IEXAPI";

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

// Check if quantity is whole number

// Check if cashBalance enough

export default transactionFormUtils;
