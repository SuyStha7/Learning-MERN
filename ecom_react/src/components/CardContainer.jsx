import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { API } from "../config";

const CardContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await axios.get(`${API}/allproduct`);
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      fetchproduct();
    }, 2000);
  }, []);
  return (
    <>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-4 d-flex justify-content-center g-4">
          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            products.slice(0, 8).map((product, i) => {
              return <Card key={i} item={product} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default CardContainer;
