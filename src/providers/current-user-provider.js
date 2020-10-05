import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";

const CurrentUserProvider = ({ children }) => {
  const Constant = useContext(Constants);
  let token = localStorage.getItem(Constant.AUTH_TOKEN);

  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: token ? true : false,
    currentUser: token, // We will fix this (if needed)
  });

  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  );
};
export default CurrentUserProvider;
