// Dependencies
import React, { useState } from "react";

// Pages
import Signup from "./Signup";
import Login from "./Login";

const ShowLoginOrSignup = props => {
  const [showLoginOrSignup, setLoginOrSignup] = useState(true);
  // btn

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 pb-5 text-white">Stock Portfolio App</h1>
      <div>
        <div className="container p-0 d-flex justify-content-start">
          <button
            className={`btn btn-lg btn-block m-0 mr-3 rounded-0 ${
              showLoginOrSignup ? "btn-info" : "btn-outline-light"
            }`}
            onClick={() => setLoginOrSignup(true)}
          >
            Login
          </button>
          <button
            className={`btn btn-lg btn-block m-0 rounded-0 ${
              showLoginOrSignup ? "btn-outline-light" : "btn-info"
            }`}
            onClick={() => setLoginOrSignup(false)}
          >
            Signup
          </button>
        </div>

        <div className="border border-warning mt-3">
          {showLoginOrSignup ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default ShowLoginOrSignup;
