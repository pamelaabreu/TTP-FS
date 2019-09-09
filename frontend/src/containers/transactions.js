// Dependencies
import React, { useState, useEffect } from "react";

// Services
import transactionsAPIService from "../services/transactionsAPI";

const Transactions = props => {
    const [transactionsList, updateTransactionsList] = useState([]);

    return (
        <div>
            <h1>Transactions</h1>
            <div>
                <p>Display Transactions</p>
            </div>
        </div>
    );
};

export default Transactions;