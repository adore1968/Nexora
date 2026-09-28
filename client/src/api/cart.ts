import type { Cart } from "../types/cart";
import axios from "./axios";

export const getCartRequest = () => axios.get("/cart");

export const addToCartRequest = (productId: string) =>
  axios.post<Cart>("/cart", { productId });

export const updateCartItemRequest = (productId: string, quantity: number) =>
  axios.put(`/cart/${productId}`, { quantity });

export const removeFromCartRequest = (productId: string) =>
  axios.delete<Cart>(`/cart/${productId}`);

export const clearCartRequest = () => axios.delete<Cart>("/cart");
