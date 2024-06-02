import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Auth/authIndex";
import { IMG_URL } from "../config";
import { Fragment } from "react";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const { user } = isAuthenticated();
  const totalPrice = cartItems.reduce(
    (ac, item) => ac + item.quantity * item.price,
    0
  );

  //   proceed to payment
  const proceedToPayment = () => {
    const data = {
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-evenly mb-3">
          <div className="col-8 shadow">
            <h2 className="text-center my-2">Shipping Info</h2>
            <div className="col-6 offset-md-3">
              <div>
                <b>Name</b>: <span className="text-muted">{user.name}</span>
              </div>
              <div>
                <b>Email</b>: <span className="text-muted">{user.email}</span>
              </div>
              <div>
                <b>City</b>:{" "}
                <span className="text-muted">{shippingInfo.city}</span>
              </div>
              <div>
                <b>Phone</b>:{" "}
                <span className="text-muted">{shippingInfo.phone}</span>
              </div>
              <div>
                <b>Country</b>:{" "}
                <span className="text-muted">{shippingInfo.country}</span>
              </div>
              <div>
                <b>Shipping Address</b>:{" "}
                <span className="text-muted">
                  {shippingInfo.shippingAddress},{" "}
                  {shippingInfo.shippingAddress2}
                </span>
              </div>
              <div>
                <b>Zip Code</b>:{" "}
                <span className="text-muted">{shippingInfo.zip}</span>
              </div>
            </div>
            <hr />
            <h2 className="text-center">
              Your Cart Items
              {cartItems.map((item, i) => (
                <Fragment key={i}>
                  <hr />
                  <div className="row d-flex align-items-center">
                    <div className="col-md-3">
                      <img
                        src={`${IMG_URL}/${item.image}`}
                        alt={item.title}
                        width={`100`}
                      />
                    </div>
                    <div className="col-md-3">
                      <p className="text-muted fs-5">{item.title}</p>
                    </div>
                    <div className="col-md-4 ">
                      <p className="text-warning fs-5">
                        Rs.{item.price} x {item.quantity} ={" "}
                        <b>Rs.{item.price * item.quantity}</b>
                      </p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </h2>
          </div>
          {/* total summary */}
          <div className="col-md-3 pt-5">
            <h4>Order Summary</h4>
            <hr />
            <p>
              SubTotal:{" "}
              <span>
                {cartItems.reduce((ac, item) => ac + Number(item.quantity), 0)}{" "}
                (Units)
              </span>{" "}
            </p>
            <b>
              Total Price: Rs. <span>{totalPrice}</span>
            </b>
            <hr />
            <button className="btn btn-success" onClick={proceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
