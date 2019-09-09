// Dependencies
import React, { useState, useEffect } from "react";

const TransactionForm = props => {
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
