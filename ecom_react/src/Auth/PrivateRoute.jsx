import React from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  return isAuthenticated() && isAuthenticated().user.role === 0 ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
