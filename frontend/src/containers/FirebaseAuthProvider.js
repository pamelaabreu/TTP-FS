// Dependencies
import React from "react";
import firebase from "../firebase";

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
}

export default FirebaseAuthProvider;
