// Dependencies
import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

// CSS
import "./App.css";

// Pages
import Transactions from "./containers/Transactions";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div>
          <Transactions />
          <Portfolio />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
