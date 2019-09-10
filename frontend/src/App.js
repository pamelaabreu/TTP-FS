// Dependencies
import React from 'react';

// CSS
import './App.css';

// Pages
import Transactions from "./containers/Transactions";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Transactions />
        <Portfolio />
      </header>
    </div>
  );
};

export default App;
