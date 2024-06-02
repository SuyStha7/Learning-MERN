import React from "react";
import { useSelector } from "react-redux";
import TestItem from "./TestItem";
import Student from "./Student";

const TextCart = () => {
  const data = useSelector((store) => store.cart);
  return (
    <>
      <h2>The number of cart is {data.cartCount}</h2>
      <TestItem />
      <Student />
    </>
  );
};

export default TextCart;
