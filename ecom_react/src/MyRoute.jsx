import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Display from "./context/Display";
import TextCart from "./Redux/TextCart";
import EmailVerify from "./Auth/EmailVerify";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import ConfirmOrder from './pages/ConfirmOrder';
import PaymentElement from './pages/PaymentElement';
import OrderSuccess from './pages/OrderSuccess'
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminRoute from "./Auth/AdminRoute";
import Dashboard from "./Admin/Dashboard";
import AddCategory from "./Admin/AddCategory";
import ShowCategory from "./Admin/ShowCategory";
import AddProduct from "./Admin/AddProduct";
import ShowProduct from "./Admin/ShowProduct";
import UpdateProduct from "./Admin/UpdateProduct";


const MyRoute = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="reset/password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/productdetail/:product_id"
              element={<ProductDetail />}
            />
            <Route path="register" element={<Register />} />
            <Route path="email/confirmation/:token" element={<EmailVerify />} />
            <Route path="products" element={<Product />} />
            <Route path="cart" element={<Cart />}/>
            <Route path="shipping" element={<Shipping />}/>
            <Route path="confirm" element={<ConfirmOrder />} />
            <Route path="payment" element={<PaymentElement />} />
            <Route path="success" element={<OrderSuccess/>}/>
          </Route>
          <Route path="show" element={<Display />} />
          <Route path="redux/cart" element={<TextCart />}></Route>

          <Route path="admin/" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="showcategories" element={<ShowCategory />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="showproducts" element={<ShowProduct />} />
            <Route path="updateproduct/:productId" element={<UpdateProduct/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MyRoute;
