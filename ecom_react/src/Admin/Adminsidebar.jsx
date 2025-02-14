import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../Auth/authIndex";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const { name, email } = isAuthenticated().user;
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end">
        <div className="col-md-1 mt-3">
          <button
            className="btn btn-success"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            Menu
          </button>
          <div
            className="offcanvas offcanvas-end bg-dark text-white"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            style={{ width: "300px" }}
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">Admin Dashboard</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="list-unstyled">
                <li>
                  <Link to="/admin/dashboard" className="text-decoration-none text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/user" className="text-decoration-none text-white">
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/addproduct"
                    className="text-decoration-none text-white"
                  >
                    Add product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/showproducts"
                    className="text-decoration-none text-white"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/addcategory"
                    className="text-decoration-none text-white"
                  >
                    Add Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/showcategories"
                    className="text-decoration-none text-white"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-decoration-none text-white">
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
            <div className="offcanvas-body">
              <ul className="list-unstyled">
                <li>
                  <Link to="#" className="text-decoration-none text-white">
                    <b>Name : </b> {name}
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-decoration-none text-white">
                    <b>Email : </b>
                    {email}
                  </Link>
                </li>
              </ul>
              <div className="img my-5">
                <img
                  src="https://thumbs.dreamstime.com/b/frontal-male-passport-photo-isolated-white-background-eu-standardization-frontal-male-passport-photo-isolated-white-149548031.jpg"
                  alt=""
                  className="img-fluid rounded-circle"
                  width="100"
                  height="100"
                />
              </div>

              <button
                className="btn btn-danger text-decoration-none"
                onClick={() => signout(() => navigate("/login"))}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
