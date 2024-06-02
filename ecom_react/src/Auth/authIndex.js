import { API } from "../config";
//for signup
export const signup = (user) => {
  return fetch(`${API}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //content type is used for post without image file
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//for signin
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //content type is used for post without image file
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//authenticate and store token in the local storage
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

//redirected user by role
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  // Check if JWT token exists in localStorage
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

//signout
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, { method: "POST" })
      .then((res) => {
        console.log("signout", res);
      })
      .catch((err) => console.log(err));
  }
};

//for forgetpassword
export const forgetpassword = (user) => {
  return fetch(`${API}/forgetpassword`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //content type is used for post without image file
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
