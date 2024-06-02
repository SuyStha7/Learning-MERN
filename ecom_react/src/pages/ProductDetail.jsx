import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API, IMG_URL } from "../config";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const id = params.product_id;
    axios
      .get(`${API}/productdetail/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.product_id]);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const productItem = {
      id: product._id,
      title: product.product_name,
      image: product.product_image,
      price: product.product_price,
      category: product.category.category_name,
      rating: product.product_rating,
      stock: product.countInStock,
      quantity: 1,
    };

    // check existance of cart item
    const existItem = cartItems.find((item) => item.id === productItem.id);

    if (existItem) {
      toast.error("Product already in cart");
    } else {
      cartItems.push(productItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.success(`${productItem.title} is successfully added to cart`);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <div className="container my-5">
        <div className="row d-flex justify-content-evenly shadow py-5">
          <div className="col-md-5 ">
            <img
              src={`${IMG_URL}/${product.product_image}`}
              alt={product.product_name}
              width={"250"}
            />
          </div>
          <div className="col-md-6 ">
            <h1>{product.product_name}</h1>
            <h4 className="text-secondary">Rs.{product.product_price}</h4>
            <h4>
              Category: {product.category && product.category.category_name}
            </h4>
            <p className="fs-4">{product.product_description}</p>
            <h5>Rating: {product.product_rating}</h5>
            <button className="btn btn-warning" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
