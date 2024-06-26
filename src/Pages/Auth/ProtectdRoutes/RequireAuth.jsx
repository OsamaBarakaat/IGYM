import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user?.token ? children : <Navigate to="/signin" />;
};

export default RequireAuth;
