// Dependencies
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

// Services
import firebase from "../firebase";

const Login = withRouter(props => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  // Updates input information
  const handleInputChange = e => {
    // Copying state
    const newInputs = { ...inputs };
    // Directly modifying the input object from the copied state
    newInputs[e.target.name] = e.target.value.trim();
    // Set State the modified copied input object
    setInputs(newInputs);
  };

  // Signs in user
  const handleLoginSubmit = e => {
    e.preventDefault();

    const { email, password } = inputs;

    // Firebase user auth sign in method
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // Re-direct loggedin user to /portfolio page
      .then(() => props.history.push("/portfolio"))
      .catch(error => {
        console.log("Trouble logging in user error:", error);
      });
  };

  const inputsArray = Object.entries(inputs);

  return (
    <div className="p-5">
      <h3 className="text-white h3">Login</h3>
      <form className="form-group" onSubmit={handleLoginSubmit}>
        {inputsArray.map(([inputName, inputValue], index) => {
          const inputType =
            inputName.toLowerCase() === "password" ? "password" : "text";

          return (
            <div className="form-group" key={index}>
              <label className="text-white" htmlFor={inputName}>
                {inputName}
              </label>
              <input
                className="form-control"
                placeholder={inputName}
                onChange={handleInputChange}
                type={inputType}
                value={inputValue}
                name={inputName}
                aria-label={`${inputName}`}
                id={inputName}
                required
                min="1"
              />
            </div>
          );
        })}
        <button className="btn btn-info" type="submit">
          Login
        </button>
      </form>
    </div>
  );
});

export default Login;
