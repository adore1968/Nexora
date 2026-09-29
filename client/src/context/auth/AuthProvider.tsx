import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "../../api/auth";
import { toast } from "react-toastify";
import {
  type User,
  type RegisterUser,
  type UserCredentials,
  type AuthError,
} from "../../types/auth";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<AuthError[] | null>(null);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      if (Array.isArray(data) && data.length > 0) {
        return data[0].error;
      }

      return data?.message || fallback;
    }

    return fallback;
  };

  const signup = async (data: RegisterUser): Promise<void> => {
    try {
      const res = await registerRequest(data);

      setUser(res.data);
      setIsAuthenticated(true);
      setErrors(null);

      toast.success("Successful register");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setErrors(error.response?.data || null);
      }

      toast.error(getErrorMessage(error, "Register error"));
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data: UserCredentials): Promise<void> => {
    try {
      const res = await loginRequest(data);

      setUser(res.data);
      setIsAuthenticated(true);
      setErrors(null);

      toast.success("Successful login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setErrors(error.response?.data || null);
      }

      toast.error(getErrorMessage(error, "Login error"));
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
      setUser(null);

      toast.success("Successful logout");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error(error.response?.data?.message || "Logout error");
      }
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        }

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
