// Dependencies
import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";

// Context
import FirebaseAuthContext from "../context/FirebaseAuth";

const Navbar = withRouter(props => {
  // Initialize FirebaseUserAuth Context
  const FirebaseUserAuth = useContext(FirebaseAuthContext);

  const UserLogout = () => {
    FirebaseUserAuth.logoutUser();
    props.history.push("/");
  };

  return (
    <>
      {!FirebaseUserAuth.user ? (
        <></>
      ) : (
        <div>
          <button onClick={UserLogout}>Logout</button>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/transactions">Transactions</Link>
        </div>
      )}
    </>
  );
});

export default Navbar;
