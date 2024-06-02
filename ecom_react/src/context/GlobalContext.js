import React, { createContext } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const std = {
    name: "Sushal",
    Roll: 25706,
  };
  return (
    <>
      <GlobalContext.Provider value={std}>
        {props.children}
      </GlobalContext.Provider>
    </>
  );
};

export default GlobalContextProvider;
