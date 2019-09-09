// Dependencies
import React, { useState, useEffect } from "react";

const TransactionForm = props => {
  const [cashBalance, setCashBalance] = useState(0);
  const [ticket, setTicket] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  return (
    <div>
      <h3>Cash - $Users Balance</h3>
      <form>
        <label htmlFor="ticket">Ticket</label>
        <input
          type="text"
          name="ticket"
          placeholder="Ticket"
          aria-label="Ticket"
          aria-describedby="Ticket"
          required
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
          //   disabled
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
