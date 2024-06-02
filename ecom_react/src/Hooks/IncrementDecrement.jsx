import React, { useState } from "react";

const IncrementDecrement = () => {
  const [num, setNum] = useState(1);
  //   const increment = () => {
  //     setNum(num + 1);
  //   };
  //   const decrement = () => {
  //     setNum(num - 1);
  //   };

  return (
    <>
      <h1 className="text-success">{num}</h1>
      {num < 10 && (
        <button
          className="btn btn-primary"
          onClick={() => {
            setNum(num + 1);
          }}
        >
          Increment
        </button>
      )}
      &nbsp;&nbsp;
      {num > 1 && (
        <button
          className="btn btn-danger"
          onClick={() => {
            setNum(num - 1);
          }}
        >
          Decrement
        </button>
      )}
    </>
  );
};

export default IncrementDecrement;
