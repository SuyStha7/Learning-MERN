import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config";

const ResetPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //read token
  const token = params.token;
  const handleSubmit = (e) => {
    e.preventDefault();

    //reset password
    fetch(`${API}/resetpassword/${token}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setPassword("");
        }
      })
      .catch((err) => console.log(err));
  };

  //to show error message
  const showError = () => {
    return error && <div className="alert alert-danger">{error}</div>;
  };
  const showSuccess = () =>
    success && (
      <div className="alert alert-success">Password successfully reset</div>
    );

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <form className="shadow p-3">
              {showError()}
              {showSuccess()}
              <h2 className="text-center text-muted">Reset password</h2>
              <div className="mb-2">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  name="pasasword"
                  id="psw"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
