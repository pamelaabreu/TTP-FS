// Dependencies
import React, { useContext } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

// Context
import FirebaseAuthContext from "./context/FirebaseAuth";

// CSS
import "./App.css";

// Pages
import Transactions from "./containers/Transactions";
import Portfolio from "./components/Portfolio";
import Navbar from "./components/Navbar";
import ShowLoginOrSignup from "./containers/ShowLoginOrSignup";

const App = () => {
  // Initialize FirebaseUserAuth Context
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  return (
    <HashRouter>
      <div className="container-fluid vh-100 bg-navy">
        {!FirebaseUserAuth.user ? (
          <div className="d-flex justify-content-center pt-5">
          <Route path="/" component={ShowLoginOrSignup} />
          </div>
        ) : (
          <div className="d-flex flex-column">
            <header className="p-5">
              <Route path="/" component={Navbar} />
            </header>
            <div>
              <Switch>
                <Route path="/transactions" exact component={Transactions} />
                <Route path="/portfolio" exact component={Portfolio} />
              </Switch>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
