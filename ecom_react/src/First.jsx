import React from "react";
import { Test } from "./Test";
import { Link } from "react-router-dom";
import("./App.css");

const First = () => {
  return (
    <>
      <h1 className="text-center">This is my first page</h1>
      <Link to={"/test"}>Test</Link>
    </>
  );
};

export default First;
