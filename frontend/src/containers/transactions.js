// Dependencies
import React, { useState, useEffect } from "react";

// Services
import transactionsAPIService from "../services/transactionsAPI";

// Component
import ListItems from "../components/ListItems";

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
        {
            transactionsList.map((value, index) => {
                const {shares_amount, ticket, transaction_price} = value;
                const transactionNote = `BUY (${ticket}) - ${shares_amount} Shares @ ${transaction_price}.00`;
                
                return <ListItems key={index} note={transactionNote}/>
            })
        }
      </div>
    </div>
  );
};

export default Transactions;
