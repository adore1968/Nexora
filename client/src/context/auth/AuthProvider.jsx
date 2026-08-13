import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "../../api/auth";
import { toast } from "react-toastify";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getErrorMessage = (error, fallback) => {
    const data = error.response?.data;

    if (Array.isArray(data) && data.length > 0) {
      return data[0].error;
    }

    return data?.message || fallback;
  };

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);

      setUser(res.data);
      setIsAuthenticated(true);
      setErrors(null);

      toast.success("Successful register");
    } catch (error) {
      console.log(error.response?.data);
      setErrors(error.response?.data || null);
      toast.error(getErrorMessage(error, "Register error"));
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);

      setUser(res.data);
      setIsAuthenticated(true);
      setErrors(null);

      toast.success("Successful login");
    } catch (error) {
      console.log(error.response?.data);
      setErrors(error.response?.data || null);
      toast.error(getErrorMessage(error, "Login error"));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
      setUser(null);

      toast.success("Successful logout");
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Logout error");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error.response?.data);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, errors, loading, signup, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
