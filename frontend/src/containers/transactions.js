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

  // Updates the transactionsList and userEmail
  useEffect(() => {
    // Use Firebase context to determine logged in user's email
    if (FirebaseUserAuth.user) {
      // Save Firebase user's email to userEmail variable
      const userEmail = FirebaseUserAuth.user.email;

      // GET request to get user's transactions
      transactionsAPIService
        .readAllUserTransaction(userEmail)
        .then(({ data }) => {
          setUserEmail(userEmail);
          setTransactionsList(data);
        })
        .catch();
    } else {
      // If Firebase context has no logged in user's email, setState default values
      setUserEmail(null);
      setTransactionsList([]);
    }
  }, [transactionsList, userEmail, FirebaseUserAuth.user]);

  return (
    <div className="p-5">
      <h1 className="h1 text-white mb-5">Transactions</h1>
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
