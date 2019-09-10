// Dependencies
import React from "react";

// Component
import Shares from "../containers/Shares";
import TransactionForm from "../containers/TransactionForm";

const Portfolio = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col border-right border-warning">
          <Shares />
        </div>
        <div className="col">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
