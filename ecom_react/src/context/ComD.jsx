import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

const ComD = () => {
  const js = useContext(GlobalContext);
  return (
    <>
      <h1>Name : {js.name} </h1>
      <h1>Roll : {js.Roll}</h1>
    </>
  );
};

export default ComD;
