// Dependencies
import React, { useState, useEffect } from "react";

// Component
import ListItems from "../components/ListItems";

const Shares = props => {
  const [sharesList, setSharesList] = useState([]);
  const [portfolioAmount, setPortfolioAmount] = useState(0);

  return (
    <div>
      <h1>Portfolio (${portfolioAmount})</h1>
      <div>
          {
             sharesList.map((value, index) => {
                const transactionNote = `Ticket - shares_amount Shares $CurrentValue.00`;
                return <ListItems key={index} note={transactionNote}/>
             }) 
          }
      </div>
    </div>
  );
};

export default Shares;
