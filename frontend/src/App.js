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
          <Route path="/" component={Navbar} />
        </header>
        <div>
          <Switch>
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/portfolio" exact component={Portfolio} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
