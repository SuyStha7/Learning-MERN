import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../Auth/authIndex";

const Login = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectedTo: false,
  });

  //destructuring values
  const { email, password, error, redirectedTo } = values;

  //handlechange
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //onsubmit
  const handleSubmit = (e) => {
    //to disable form action attribute
    e.preventDefault();
    setValues({ ...values, error: false });

    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // setValues({ ...values, redirectedTo: true });
        authenticate(data, () => {
          setValues({ ...values, redirectedTo: true });
        });
      }
    });
  };

  //to redirect user
  const redirectedToUser = () => {
    const searchParmas = new URLSearchParams(window.location.search);
    const redirectParams = searchParmas.get("redirect");
    if (redirectedTo) {
      // navigate("/products");
      if (user && user.role === 1) {
        return navigate("/admin/dashboard");
      } else if (redirectParams === "shipping") {
        navigate("/shipping");
      } else {
        navigate("/profile");
      }
    }
  };
  //to show error message
  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };
  return (
    <>
      <div className="container my-3 col-4">
        <div className="shadow p-4 ">
          <form>
            {showError()}
            {redirectedToUser()}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange("email")}
                value={email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div className="my-2">
              <div className="d-flex justify-content-between">
                <Link to="/forgetpassword" className="text-decoration-none">
                  Forget password
                </Link>
                <Link to="/register" className="text-decoration-none">
                  Create Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
