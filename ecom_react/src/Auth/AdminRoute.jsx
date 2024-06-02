import React from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/Adminsidebar";
const AdminRoute = () => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    <>
      <AdminSidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
