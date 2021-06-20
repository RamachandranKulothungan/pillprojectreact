import React, { createContext } from "react";

const Constant = {
  AUTH_TOKEN: "MEM_AUTH_TOKEN",
  HOST_SERVER: "http://localhost:3000",
  API_SESSIONS: `${HOST_SERVER}/sessions`,
  REGISTER: `${HOST_SERVER}/users.json`,
  DEPENDENTS: `${HOST_SERVER}/dependents.json`,
  HISTORY: `${HOST_SERVER}/histories.json`,
};

const GlobalContext = createContext(Constant);

export default GlobalContext;
