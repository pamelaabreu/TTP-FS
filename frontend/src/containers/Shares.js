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
      sharesAPIService.readAllShares("default@testing.com")
      .then(({ data }) => sharesUtils.convertSharesArray(data))
      .then(convertedData => {
        const totalPortfolioAmount = sharesUtils.addTotal(convertedData);
        setPortfolioAmount(totalPortfolioAmount);
        setSharesList(convertedData);
      })
    }
  }, [sharesList, portfolioAmount]);

  return (
    <div>
      <h1>Portfolio (${portfolioAmount})</h1>
      <div>
        {sharesList.map((value, index) => {
          const transactionNote = `Ticket - shares_amount Shares $CurrentValue.00`;
          return <ListItems key={index} note={transactionNote} />;
        })}
      </div>
    </div>
  );
};

export default Shares;
