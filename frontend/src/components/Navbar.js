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
        <div className="nav d-flex justify-content-between">
          <button className="h3 btn btn-primary m-3" onClick={UserLogout}>
            Logout
          </button>
          <div className="d-flex">
            <Link className="nav-item m-2 h3 text-white" to="/portfolio">
              Portfolio
            </Link>
            <Link className="nav-item m-2 h3 text-white" to="/transactions">
              Transactions
            </Link>
          </div>
        </div>
      )}
    </>
  );
});

export default Navbar;
