import React, { useState } from "react";
import { forgetpassword } from "../Auth/authIndex";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    forgetpassword({ email })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setError("");
          setSuccess(true);
          setEmail("");
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
      <div className="alert alert-success">
        Password reset link has been sent to your mail
      </div>
    );

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <form className="shadow p-3">
              {showError()}
              {showSuccess()}
              <h2 className="text-center text-muted">Forget password</h2>
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Send password reset link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
