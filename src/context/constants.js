import React, { createContext } from "react";

const Constant = {
  AUTH_TOKEN: "MEM_AUTH_TOKEN",
  API_SESSIONS: "http://localhost:4000/sessions",
  REGISTER: "http://localhost:4000/users.json",
  DEPENDENTS: "http://localhost:4000/dependents.json",
  HISTORY: "http://localhost:4000/histories.json",
};

const GlobalContext = createContext(Constant);

export default GlobalContext;
