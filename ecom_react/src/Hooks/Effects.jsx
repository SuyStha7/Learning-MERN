import React, { useEffect, useState } from "react";

const Effects = () => {
  const [data, setData] = useState(1);
  const [num, setNum] = useState(1);

  useEffect(() => {
    alert("This is Effect.");
  }, [data]);
  return (
    <>
      <h2 className="text-success">{data}</h2>
      <button className="btn btn-success" onClick={() => setData(data + 1)}>
        Add
      </button>
      <h2 className="text-danger">{num}</h2>
      <button className="btn btn-danger" onClick={() => setNum(num + 1)}>
        Add
      </button>
    </>
  );
};

export default Effects;
