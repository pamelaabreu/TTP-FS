// Dependencies
import React from 'react';

// CSS
import './App.css';

// Pages
import Transactions from "./containers/Transactions";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Transactions />
      </header>
    </div>
  );
};

export default App;
