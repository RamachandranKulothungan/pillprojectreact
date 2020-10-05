import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../context/current-user-context";
import Login from "./login";
import Landing from "./landing";
function MainApp() {
  const [currentUserState, setCurrentUserState] = useContext(
    CurrentUserContext
  );
  console.log("CUS: ", currentUserState);

  let landing = currentUserState.currentUser ? <Landing /> : <Login />;
  return landing;
}

export default MainApp;
