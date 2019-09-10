// Dependencies
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

// Services
import firebase from "../firebase";
import usersAPIService from "../services/usersAPI";

const Signup = withRouter(props => {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  // Updates input values held in state
  const handleInputChange = e => {
    // Copy input state
    const newInputs = { ...inputs };
    // Directly modify the input value from the copied state
    newInputs[e.target.name] = e.target.value.trim();
    // Set State the modified copied input object
    setInputs(newInputs);
  };

  // Creates a user when submit buttion is clicked
  const handleSignupSubmit = e => {
    e.preventDefault();
    const { email, password, name } = inputs;

    // Create firebase user
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => response.user.uid)
      // Create user in the Postgres database
      .then(
        firebaseUid => usersAPIService.createUser(name, email, firebaseUid),
        err => console.log("Trouble Creating DB User Error", err)
      )
      // Re-direct page to /portfolio
      .then(() => props.history.push("/portfolio"))
      .catch(err => console.log("Trouble Creating Firebase User Error", err));
  };

  const inputsArray = Object.entries(inputs);

  return (
    <form onSubmit={handleSignupSubmit}>
      {inputsArray.map(([inputName, inputValue], index) => {
        const inputType =
          inputName.toLowerCase() === "password" ? "password" : "text";
        return (
          <div className="form-group" key={index}>
            <label htmlFor={inputName}>{inputName}</label>
            <input
              onChange={handleInputChange}
              key={index}
              type={inputType}
              value={inputValue}
              name={inputName}
              required
              aria-label={`${inputName}`}
              id={inputName}
              min="1"
            />
          </div>
        );
      })}
      <button type="submit">Signup</button>
    </form>
  );
});

export default Signup;
