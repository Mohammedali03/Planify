import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = () => {
  const { isAuthenticated, isVerified } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isVerified === 0) {
    return <Navigate to="/confirm-email" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
