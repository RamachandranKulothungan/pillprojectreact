import React, { useContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import CurrentUserContext from "../context/current-user-context";
import Constants from "../context/constants";

function CurrentUserChecker({ children }) {
  const Constant = useContext(Constants);
  const token = localStorage.getItem(Constant.AUTH_TOKEN);
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const { response, doFetch } = useFetch(`${HOST_SERVER}/sessions/user`);

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }
    doFetch();

    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [setCurrentUserState, token]);

  useEffect(() => {
    if (!response) {
      return;
    }

    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response,
    }));
  }, [response, setCurrentUserState]);

  return children;
}
export default CurrentUserChecker;
