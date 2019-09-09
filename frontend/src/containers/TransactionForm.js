// Dependencies
import React, { useState, useEffect } from "react";

// Services
import usersAPIService from "../services/usersAPI";
import transactionFormUtils from "../utilities/transactionFormUtils";

const TransactionForm = props => {
  const [cashBalance, setCashBalance] = useState(0);

  const [ticket, setTicket] = useState("");
  const [isValidTicket, setIsValidTicket] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(0);

  const [quantity, setQuantity] = useState("");

  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);

  // Updates the user's cashBalance
  useEffect(() => {
    if(cashBalance === 0){
      usersAPIService.readAllUserCashBalance("default@testing.com").then(({data}) => setCashBalance(data.cash_balance))
    }
  }, [cashBalance]);

  // Validate ticket
  useEffect(() => {
    if(ticket.length > 0){
      const isValid = transactionFormUtils.checkValidTicket(ticket);
      if(isValid){
        setIsValidTicket(true);
        // remove error messgae
      } else {
        setIsValidTicket(false);
        // set error message
      }
    };  
  }, [ticket]);

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
          type="text"
          name="quantity"
          placeholder="Quantity"
          aria-label="Quantity"
          aria-describedby="Quantity"
          required
        />
        <button
          type="submit button"
          // onClick={resetName}
          //   disabled
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
