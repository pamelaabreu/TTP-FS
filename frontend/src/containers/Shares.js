// Dependencies
import React, { useState, useEffect } from "react";

const Shares = props => {
  const [sharesList, setSharesList] = useState([]);
  const [portfolioAmount, setPortfolioAmount] = useState(0);

  return (
    <div>
      <h1>Portfolio ($Cash Amount)</h1>
      <p>Display shares here</p>
    </div>
  );
};

export default Shares;
