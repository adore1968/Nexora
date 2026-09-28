import type { AxiosResponse } from "axios";
import axios from "./axios";
import type { RegisterUser, User, UserCredentials } from "../types/auth";

export const registerRequest = (user: RegisterUser) =>
  axios.post<User>(`/auth/register`, user);

export const loginRequest = (user: UserCredentials) =>
  axios.post<User>(`/auth/login`, user);

export const logoutRequest = (): Promise<AxiosResponse> =>
  axios.post("/auth/logout");

export const verifyTokenRequest = () => axios.get<User>("/auth/verify");
