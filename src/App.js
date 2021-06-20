import React, { useContext, useState, useEffect } from "react";
import NavBar from "./components/navbar";

import "bootstrap/dist/css/bootstrap.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import CurrentUserChecker from "./components/current-user-checker";
import CurrentUserProvider from "./providers/current-user-provider";
import MainApp from "./features/mainapp";
import Profile from "./features/profile";
import MedicalHistory from "./features/medical-history";
import AuthenticatedRoutes from "./components/authenticated-routes";
import Register from "./features/register";
import $ from "jquery";
import Popper from "popper.js";
import ChangePassword from "./features/changepassword";

function App() {
  return (
    <div className="container-fluid">
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <NavBar title="PILLS REMINDER" />
            <Switch>
              <Route path="/" exact>
                <div className="d-flex mt-5 justify-content-center align-items-center">
                  <MainApp />
                </div>
              </Route>
              <Route path="/register" exact>
                <div className="d-flex mt-5 justify-content-center align-items-center">
                  <Register />
                </div>
              </Route>
              <AuthenticatedRoutes>
                <Route path="/profile">
                  <div className="d-flex mt-5 justify-content-center align-items-center">
                    <Profile />
                  </div>
                </Route>
                <Route path="/medical-history">
                  <div className="d-flex mt-5 justify-content-center align-items-center">
                    <MedicalHistory />
                  </div>
                </Route>
                <Route path="/update-password">
                  <div className="d-flex mt-5 justify-content-center align-items-center">
                    <ChangePassword />
                  </div>
                </Route>
              </AuthenticatedRoutes>
            </Switch>
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
