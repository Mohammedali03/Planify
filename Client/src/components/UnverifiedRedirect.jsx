import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const UnverifiedRedirect = () => {
  const { isAuthenticated, isVerified } = useAuth();

  if (isAuthenticated && isVerified === 1) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default UnverifiedRedirect;
