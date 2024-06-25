import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  return localStorage.getItem("jwt") ? children : <Navigate to="/signin" />;
};

export default RequireAuth;
