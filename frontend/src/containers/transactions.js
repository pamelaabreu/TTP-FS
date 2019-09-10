// Dependencies
import React, { useState, useEffect, useContext } from "react";

// Context
import FirebaseAuthContext from "../context/FirebaseAuth";

// Services
import transactionsAPIService from "../services/transactionsAPI";

// Component
import ListItems from "../components/ListItems";

const Transactions = props => {
  // Initialize FirebaseUserAuth Context
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  // State
  const [userEmail, setUserEmail] = useState(null);
  const [transactionsList, setTransactionsList] = useState([]);

  // Use Firebase context to determine logged in user's email
  useEffect(() => {
    if (FirebaseUserAuth.user) {
      setUserEmail(FirebaseUserAuth.user.email);
    } else {
      setUserEmail(null);
    }
  }, [userEmail, FirebaseUserAuth.user]);

  // Updates the transactionsList
  useEffect(() => {
    if (transactionsList.length === 0) {
      transactionsAPIService
        .readAllUserTransaction(userEmail)
        .then(({ data }) => {
          setTransactionsList(data);
        })
        .catch();
    }
  }, [transactionsList, userEmail]);

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        {transactionsList.map((value, index) => {
          const { shares_amount, ticket, transaction_price } = value;
          const transactionNote = `BUY (${ticket}) - ${shares_amount} Shares @ ${transaction_price}.00`;

          return <ListItems key={index} note={transactionNote} />;
        })}
      </div>
    </div>
  );
};

export default Transactions;
