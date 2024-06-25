import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, isAllow, redirectPath }) => {
  return isAllow ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoutes;
