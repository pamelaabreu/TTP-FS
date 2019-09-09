// Dependencies
import React, { useState, useEffect } from "react";

// Services
import usersAPIService from "../services/usersAPI";

const TransactionForm = props => {
  const [cashBalance, setCashBalance] = useState(0);
  const [ticket, setTicket] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Updates the user's cashBalance
  useEffect(() => {
    if(cashBalance === 0){
      usersAPIService.readAllUserCashBalance("default@testing.com").then(({data}) => setCashBalance(data.cash_balance))
    }
  }, [cashBalance]);

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
          // onChange={updateTicket}
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
