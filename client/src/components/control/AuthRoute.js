import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
// import LoginPage from "../auth/LoginPage";

const useAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    token && token.user && token.access_token
  );
};

const AuthRoute = () => {
  const location = useLocation();
  const isAdmin = useAuth();

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default AuthRoute;