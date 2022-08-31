import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
// import LoginPage from "../auth/LoginPage";

const useAdmin = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(user)
  return (
    token && token.user && token.access_token && token.user.user_level == 0
  );
};

const AdminRoute = () => {
  const location = useLocation();
  const isAdmin = useAdmin();

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
export default AdminRoute;