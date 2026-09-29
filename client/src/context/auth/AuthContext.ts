import { createContext, useContext } from "react";
import type {
  AuthError,
  RegisterUser,
  User,
  UserCredentials,
} from "../../types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: AuthError[] | null;
  signup: (data: RegisterUser) => Promise<void>;
  signin: (data: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
