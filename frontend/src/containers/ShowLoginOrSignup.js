// Dependencies
import React, { useState } from "react";

// Pages
import Signup from "./Signup";
import Login from "./Login";

const ShowLoginOrSignup = props => {
  const [showLoginOrSignup, setLoginOrSignup] = useState(true);

  return (
    <div>
      <div>
        <button
          onClick={() => setLoginOrSignup(true)}
        >
          Login
        </button>
        <button
          onClick={() => setLoginOrSignup(false)}
        >
          Signup
        </button>
      </div>

      <div>
        {showLoginOrSignup ? (
          <Login />
        ) : (
          <Signup />
        )}
      </div>
    </div>
  );
};

export default ShowLoginOrSignup;
