import React, { useEffect, useState } from "react";
import axios from "axios";

const DataFetch = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5 p-4">
      {product &&
        product.map((item, i) => {
          return (
            <div key={i}>
              <h2 className="text-primary">{item.title}</h2>
              <p className="text-secondary">${item.price}</p>
            </div>
          );
        })}
    </div>
  );
};

export default DataFetch;
