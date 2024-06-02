import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Student = () => {
  const std = useSelector((store) => store.student);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    dispatch({ type: "CHANGE_NAME", payload: name });
  };
  return (
    <>
      <h1>My name is {std.stdName}</h1>;<h1>form</h1>
      <input
        type="text"
        name="std"
        placeholder="Enter your name"
        className="form-control w-25"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default Student;
