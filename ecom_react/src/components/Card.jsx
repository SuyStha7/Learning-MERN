import React from "react";
import { Link } from "react-router-dom";
import { IMG_URL } from "../config";

const Card = (props) => {
  // const title = props.item.title;
  // const image = props.item.image;
  //data destructuring
  const { _id, product_name, product_image, product_price } = props.item;
  return (
    <>
      <div className="col">
        <div className="card">
          <img
            src={`${IMG_URL}/${product_image}`}
            className="card-img-top"
            alt={`${product_name}`}
          />
          <div className="card-body">
            <h5 className="card-title">{`${product_name}`}</h5>
            <p><b>Rs</b> {product_price}</p>
            <Link to={`/productdetail/${_id}`} className="btn btn-primary">
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
