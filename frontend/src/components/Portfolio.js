// Dependencies
import React from "react";

// Component
import Shares from "../containers/Shares";
import TransactionForm from "../containers/TransactionForm";

const Portfolio = props => {
  return (
    <div>
        <Shares />
        <TransactionForm />
    </div>
  );
};

export default Portfolio;
