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

  // Use Firebase context to determine logged in user's email
  useEffect(() => {
    if (FirebaseUserAuth.user) {
      setUserEmail(FirebaseUserAuth.user.email);
    } else {
      setUserEmail(null);
    }
  }, [userEmail, FirebaseUserAuth.user]);

  // Updates the user's cashBalance
  useEffect(() => {
    if (cashBalance === 0) {
      usersAPIService
        .readAllUserCashBalance(userEmail)
        .then(({ data }) => setCashBalance(data.cash_balance));
    }
  }, [cashBalance, userEmail]);

  // Validate ticket
  useEffect(() => {
    if (ticket.length > 0) {
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
      transactionFormUtils
        .getTicketPrice(ticket.toUpperCase(), parseInt(quantity))
        .then(ticketPrice => setTicketAmount(ticketPrice));
    } else {
      setTicketAmount(0);
    }
  }, [isValidTicket, isValidQuantity, ticket, quantity]);

  // Check if user has enough cash to buy shares
  useEffect(() => {
    if (ticketAmount > 0) {
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
      <h3>Cash - ${cashBalance}</h3>
      <form>
        <label htmlFor="ticket">Ticket</label>
        <input
          type="text"
          name="ticket"
          value={ticket}
          placeholder="Ticket"
          aria-label="Ticket"
          aria-describedby="Ticket"
          required
          onChange={e => setTicket(e.target.value)}
        />

        <label htmlFor="quantity">QTY</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          placeholder="Quantity"
          aria-label="Quantity"
          aria-describedby="Quantity"
          required
          onChange={e => setQuantity(e.target.value)}
        />
        <button type="submit button" onClick={buyShare}>
          Buy
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
