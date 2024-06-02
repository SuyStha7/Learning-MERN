import React from "react";
import ComA from "./ComA";
import GlobalContextProvider from "./GlobalContext";

const Display = () => {
  return (
    <>
      <GlobalContextProvider>
        <ComA />
      </GlobalContextProvider>
    </>
  );
};

export default Display;
