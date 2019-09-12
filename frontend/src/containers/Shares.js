// Dependencies
import React, { useState, useEffect, useContext } from "react";

// Context
import FirebaseAuthContext from "../context/FirebaseAuth";

// Component
import ListItems from "../components/ListItems";

// Services
import sharesAPIService from "../services/sharesAPI";
import sharesUtils from "../utilities/sharesUtils";

const Shares = props => {
  // Initialize FirebaseUserAuth Context
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  // State
  const [sharesList, setSharesList] = useState([]);
  const [portfolioAmount, setPortfolioAmount] = useState(0);
  const [userEmail, setUserEmail] = useState(null);

  // Use Firebase context to determine logged in user's email
  useEffect(() => {
    if (FirebaseUserAuth.user) {
      setUserEmail(FirebaseUserAuth.user.email);
    } else {
      setUserEmail(null);
    }
  }, [userEmail, FirebaseUserAuth.user]);

  // Updates the sharesList and portfolioAmount
  useEffect(() => {
    if (sharesList.length === 0) {
      sharesAPIService
        .readAllShares(userEmail)
        // .readAllShares("default@testing.com")
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
  }, [sharesList, portfolioAmount, userEmail]);

  return (
    <div>
      <h1 className="text-white h1 mb-5">Portfolio (${portfolioAmount})</h1>
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
