// Dependencies
import React from 'react';

// CSS
import './App.css';

// Pages
import Transactions from "./containers/Transactions";
import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Transactions />
        <Portfolio />
      </header>
    </div>
  );
};

export default App;
