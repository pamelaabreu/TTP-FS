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

  // Updates the sharesList, portfolioAmount, userEmail
  useEffect(() => {
    // Use Firebase context to determine logged in user's email
    if (FirebaseUserAuth.user) {
      // Save Firebase user's email to userEmail variable
      const userEmail = FirebaseUserAuth.user.email;

      // GET request to get user's shares
      sharesAPIService
        .readAllShares(userEmail)
        .then(({ data }) => {
          // Convert data array to include currentPrice and perfomance values
          return sharesUtils.convertSharesArray(data);
        })
        .then(convertedData => {
          // Convert data set to one value to determine user's portfolio amount
          const totalPortfolioAmount = sharesUtils.addTotal(convertedData);

          // Set State
          setUserEmail(userEmail);
          setSharesList(convertedData);
          setPortfolioAmount(totalPortfolioAmount);
        });
    } else {
      // If Firebase context has no logged in user's email, setState default values
      setUserEmail(null);
      setSharesList([]);
      setPortfolioAmount(0);
    }
  }, [sharesList, portfolioAmount, userEmail, FirebaseUserAuth.user]);

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
