import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";
import { Link } from "react-router-dom";
function Login() {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const { isLoading, response, error, doFetch } = useFetch(
    Constant.API_SESSIONS
  );

  let token = localStorage.getItem(Constant.AUTH_TOKEN);

  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch({
      method: "post",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
  };

  // When user logins in
  useEffect(() => {
    if (!response) return;

    console.log("RESPONSE: ", response);
    if (!response.token) return;

    // Set the auth token in localStorage
    localStorage.setItem(Constant.AUTH_TOKEN, response.token);
    localStorage.setItem("user_id", response.id)
    // Update the userContext
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response,
    }));
  }, [response]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card p-5" style={{ maxWidth: "400px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Welcome to Pill Reminder</h2>
        <div>
          {response && JSON.stringify(response)}
          {error && JSON.stringify(error)}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange}
            value={user.email}
            name="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button>Sign in</button>
        </div>
        <div className="d-flex mt-4 justify-content-around">
          {/* <button>Forgot Password?</button> */}
          <Link to="/register">New User</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
