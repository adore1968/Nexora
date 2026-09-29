export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterUser extends UserCredentials {
  username: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}
export interface AuthError {
  field: string;
  error: string;
}
