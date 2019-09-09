// Dependencies
import React, { useState, useEffect } from "react";

// Component
import ListItems from "../components/ListItems";

// Services
import sharesAPIService from "../services/sharesAPI";
import IEXAPIService from "../services/IEXAPI";
import sharesUtils from "../utilities/sharesUtils";

const Shares = props => {
  const [sharesList, setSharesList] = useState([]);
  const [portfolioAmount, setPortfolioAmount] = useState(0);

  // Updates the sharesList and portfolioAmount
  useEffect(() => {
    if (sharesList.length === 0) {
      sharesAPIService
        .readAllShares("default@testing.com")
        .then(({ data }) => {
          // Convert data set to include currentPrice and perfomance values
          return sharesUtils.convertSharesArray(data);
        })
        .then(convertedData => {
          // Convert data set to include currentPrice and perfomance values
          const totalPortfolioAmount = sharesUtils.addTotal(convertedData);
          setSharesList(convertedData);
          setPortfolioAmount(totalPortfolioAmount);
        });
    }
  }, [sharesList, portfolioAmount]);

  return (
    <div>
      <h1>Portfolio (${portfolioAmount})</h1>
      <div>
        {sharesList.map((value, index) => {
          const { currentPrice, performance, shares_amount, ticket } = value;
          const transactionNote = `${ticket.toUpperCase()} - ${shares_amount} Shares $${currentPrice}.00`;
          return (
            <ListItems
              key={index}
              note={transactionNote}
              performance={performance}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Shares;
