import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config";

const EmailVerify = () => {
  const params = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = params.token;
    fetch(`${API}/confirmation/${token}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        //content type is used for post without image file
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setSuccess(true);
          setError("");
        }
      })
      .catch((err) => console.log(err));
  }, [params.token]);

  const showError = () => {
    error && <div className="alert alert-danger">{error}</div>;
  };
  const showSuccess = () =>
    success && (
      <div className="alert alert-success">
        Email verfifed Successfully!, Login to continue
      </div>
    );
  return (
    <>
      {showError()}
      {showSuccess()}
    </>
  );
};

export default EmailVerify;
