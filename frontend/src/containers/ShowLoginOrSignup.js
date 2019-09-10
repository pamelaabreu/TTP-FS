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
      <h1 className="display-4 mb-5 pb-5 text-white">Stock Portfolio App</h1>
      <div className="container d-flex justify-content-center mb-3 pb-3">
        <button
          className={`btn m-3 ${showLoginOrSignup ? "btn-light" : "btn-dark"}`}
          onClick={() => setLoginOrSignup(true)}
        >
          Login
        </button>
        <button
          className={`btn m-3 ${showLoginOrSignup ? "btn-dark" : "btn-light"}`}
          onClick={() => setLoginOrSignup(false)}
        >
          Signup
        </button>
      </div>

      <div className="border border-primary">
        {showLoginOrSignup ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default ShowLoginOrSignup;
