import React from "react";
import { isAuthenticated } from "../Auth/authIndex";

const Profile = () => {
  const { user } = isAuthenticated();
  return (
    <>
      <h2>Name: {user.name} </h2>
      <h2>Email:{user.email} </h2>
    </>
  );
};

export default Profile;
