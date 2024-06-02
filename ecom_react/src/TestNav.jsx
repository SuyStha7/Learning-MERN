import React from "react";
import { Link } from "react-router-dom";

const TestNav = () => {
  return (
    <>
      <Link to={"/first"}>First</Link>
      <Link to={"/test"}>Test</Link>
    </>
  );
};

export default TestNav;
