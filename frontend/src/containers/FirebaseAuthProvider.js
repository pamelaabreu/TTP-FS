// Dependencies
import React from "react";
import firebase from "../firebase";

// Context
import FirebaseAuthContext from "../context/FirebaseAuth";

// Page
import App from "../App";

class FirebaseAuthProvider extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  logoutUser = () => firebase.auth().signOut();

  render() {
    return (
      <FirebaseAuthContext.Provider
        value={{ user: this.state.user, logoutUser: this.logoutUser }}
      >
        <App />
      </FirebaseAuthContext.Provider>
    );
  }
}

export default FirebaseAuthProvider;
