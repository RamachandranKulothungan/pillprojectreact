import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function NavBar({ title }) {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = React.useContext(
    CurrentUserContext
  );

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem(Constant.AUTH_TOKEN);
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
      currentUser: null,
    }));
  };

  return (
    <div>
      {currentUserState.currentUser && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            {title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  My Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medical-history">
                  Medical History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update-password">
                  Change Password
                </Link>
              </li>
            </ul>
            {currentUserState.currentUser && (
              <a onClick={handleSignOut} href="#" className="nav-link">
                Signout {currentUserState.currentUser.email}
              </a>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
export default NavBar;
