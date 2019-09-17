// Dependencies
import React, { useState, useEffect, useContext } from "react";

// Context
import FirebaseAuthContext from "../context/FirebaseAuth";

// Services
import usersAPIService from "../services/usersAPI";
import transactionsAPIService from "../services/transactionsAPI";
import transactionFormUtils from "../utilities/transactionFormUtils";

const TransactionForm = props => {
  // Initialize FirebaseUserAuth Context
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  // State
  const [userEmail, setUserEmail] = useState(null);

  const [ticketAmount, setTicketAmount] = useState(0);

  const [cashBalance, setCashBalance] = useState(0);
  const [isValidCashBalance, setIsValidCashBalance] = useState(false);

  const [ticket, setTicket] = useState("");
  const [isValidTicket, setIsValidTicket] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [isValidQuantity, setIsValidQuantity] = useState(false);

  // Updates the user's cashBalance and userEmail
  useEffect(() => {
    // Use Firebase context to determine logged in user's email
    if (FirebaseUserAuth.user) {
      // Save Firebase user's email to userEmail variable
      const userEmail = FirebaseUserAuth.user.email;

      // GET request to get user's cash balance
      usersAPIService.readAllUserCashBalance(userEmail).then(({ data }) => {
        setUserEmail(userEmail);
        setCashBalance(data.cash_balance);
      });
    } else {
      // If Firebase context has no logged in user's email, setState default values
      setUserEmail(null);
      setCashBalance(0);
    }
  }, [cashBalance, userEmail, FirebaseUserAuth.user]);

  // Validate ticket
  useEffect(() => {
    if (ticket.length > 0) {
      // Utility function to check if ticket is valid, returns boolean
      const isValid = transactionFormUtils.checkValidTicket(ticket);
      if (isValid) {
        setIsValidTicket(true);
        // remove error messgae
      } else {
        setIsValidTicket(false);
        // set error message
      }
    }
  }, [ticket]);

  // Validate quantity
  useEffect(() => {
    if (quantity.length > 0) {
      // Utility function to check if ticket quantity is a whole number, returns boolean
      const isValid = transactionFormUtils.isWholeNum(quantity);

      if (isValid) {
        setIsValidQuantity(true);
        // remove error messgae
      } else {
        setIsValidQuantity(false);
        // set error message
      }
    }
  }, [quantity]);

  // Get ticket amount
  useEffect(() => {
    if (isValidTicket && isValidQuantity) {
      // GET request to get ticket amount
      transactionFormUtils
        .getTicketPrice(ticket.toUpperCase(), parseInt(quantity))
        // Set Ticket Amount in state
        .then(ticketPrice => setTicketAmount(ticketPrice));
    } else {
      setTicketAmount(0);
    }
  }, [isValidTicket, isValidQuantity, ticket, quantity]);

  // Check if user has enough cash to buy shares
  useEffect(() => {
    if (ticketAmount > 0) {
      // Utility function to check if user has enough cash to buy, returns boolean
      const isEnoughCash = transactionFormUtils.isEnoughCash(
        cashBalance,
        ticketAmount
      );
      if (isEnoughCash) {
        setIsValidCashBalance(true);
        // remove error messgae
      } else {
        setIsValidCashBalance(false);
        // set error message
      }
    }
  }, [ticketAmount, cashBalance]);

  // Buy share
  const buyShare = e => {
    e.preventDefault();

    if (isValidCashBalance && isValidTicket && isValidQuantity) {
      // POST request to make a transaction
      transactionsAPIService.createTransaction(
        userEmail,
        ticket.toUpperCase(),
        ticketAmount,
        quantity
      );
    }
  };

  return (
    <div>
      <h3 className="h3 text-white mb-5">Cash - ${cashBalance}</h3>
      <form>
        <div className="form-group">
          <label className="text-white" htmlFor="ticket">
            Ticket
          </label>
          <input
            className="form-control"
            type="text"
            name="ticket"
            value={ticket}
            placeholder="Ticket"
            aria-label="Ticket"
            aria-describedby="Ticket"
            required
            onChange={e => setTicket(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="text-white" htmlFor="quantity">
            QTY
          </label>
          <input
            className="form-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Quantity"
            aria-label="Quantity"
            aria-describedby="Quantity"
            required
            onChange={e => setQuantity(e.target.value)}
          />
        </div>
        <button
          className="btn btn-info"
          type="submit button"
          onClick={buyShare}
        >
          Buy
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
