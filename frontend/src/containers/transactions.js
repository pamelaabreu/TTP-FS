// Dependencies
import React, { useState, useEffect } from "react";

// Services
import transactionsAPIService from "../services/transactionsAPI";

const Transactions = props => {
  const [transactionsList, setTransactionsList] = useState([]);

  // Updates the transactionsList
  useEffect(() => {
    if (transactionsList.length === 0) {
      transactionsAPIService
        .readAllUserTransaction("default@testing.com")
        .then(({ data }) => {
          setTransactionsList(data);
        })
        .catch();
    }
  }, [transactionsList]);

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        <p>Display Transactions</p>
      </div>
    </div>
  );
};

export default Transactions;
