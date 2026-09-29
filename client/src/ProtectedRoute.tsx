import { useAuth } from "./context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./components/Spinner";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
