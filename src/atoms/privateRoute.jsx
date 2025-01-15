import React from "react";
import { Navigate } from "react-router-dom";
import { getValidToken } from "../atoms/tokenvalid"; // Make sure the path is correct

const PrivateRoute = ({ children }) => {
  const token = window.sessionStorage.getItem('token')
  // If the token is valid, render the children, otherwise redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
