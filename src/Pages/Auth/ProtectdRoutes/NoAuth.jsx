import { Navigate } from "react-router-dom";

const NoAuth = ({ children }) => {
  return !localStorage.getItem("jwt") ? children : <Navigate to="/signin" />;
};

export default NoAuth;
