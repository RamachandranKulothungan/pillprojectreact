import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import Constants from "../context/constants";
import CurrentUserContext from "../context/current-user-context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink,
} from "react-router-dom";
import NewUserPage from "../components/new-user-page";
import Errorlist from "../components/errors"

function Register() {
  const Constant = useContext(Constants);
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  const registerfetch = useFetch(Constant.REGISTER);
  const loginfetch = useFetch(Constant.API_SESSIONS);
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    dob: "",
    password: "",
    password_confirmation: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerfetch.doFetch({
      method: "post",
      body: JSON.stringify({ user: formData }),
    });
  };

  const resetErrors = () => {
    setErrors({})
  }

  useEffect(() => {
    if (registerfetch.response) {
      console.log("RESPONSE: ", registerfetch.response);
      if (registerfetch.response.id) {
        loginfetch.doFetch({
          method: "post",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
      }
      else {
        setErrors(registerfetch.response)
      }
    }
  }, [registerfetch.response]);

  useEffect(() => {
    if (!loginfetch.response) return;

    console.log("RESPONSE: ", loginfetch.response);
    if (!loginfetch.response.token) return;
    // Update the userContext
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: loginfetch.response,
    }));
    // Set the auth token in localStorage
    localStorage.setItem(Constant.AUTH_TOKEN, loginfetch.response.token);
    localStorage.setItem("user_id", loginfetch.response.id);
  }, [registerfetch.response, loginfetch.response]);

  return (
    <div>
      {currentUserState.isLoggedIn && <Redirect to="/" />}

      {!currentUserState.isLoggedIn && (
        <>
          <NewUserPage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetErrors={resetErrors}
          />
          {errors && <Errorlist errors={errors} />}
        </>
      )}
    </div>
  );
}

export default Register;
