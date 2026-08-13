import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth/AuthContext";
import Spinner from "./components/Spinner";

function AdminProtectedRoute() {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
