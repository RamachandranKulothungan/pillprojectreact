import React from "react";
import CurrentUserContext from "../context/current-user-context";
import { Redirect } from "react-router-dom";

export default function AuthenticatedRoutes({ children }) {
  const [userContext, _] = React.useContext(CurrentUserContext);
  if (!userContext.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return children;
}
