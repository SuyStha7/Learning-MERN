import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { API } from "../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Limit, setLimit] = useState(4);
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
      <div className="container mt-3 mb-3">
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
            products.slice(0, Limit).map((product, i) => {
              return <Card key={i} item={product} />;
            })
          )}

          {Limit < products.length && (
            <div className="container my-3">
              <div className="row d-flex justify-content-center">
                <button
                  className="btn btn-success col-md-5"
                  onClick={() => {
                    setLimit(Limit + 4);
                  }}
                >
                  Load more
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
