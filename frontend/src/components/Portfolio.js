// Dependencies
import React from "react";

const Portfolio = props => {
  return (
    <div>
      <div>
        <h1>Portfolio ($Cash Amount)</h1>
        <p>Display shares here</p>
      </div>
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
    </div>
  );
};

export default Portfolio;
