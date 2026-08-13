import axios from "./axios";

export const getCartRequest = () => axios.get("/cart");

export const addToCartRequest = (productId) =>
  axios.post("/cart", { productId });

export const updateCartItemRequest = (productId, quantity) =>
  axios.put(`/cart/${productId}`, { quantity });

export const removeFromCartRequest = (productId) =>
  axios.delete(`/cart/${productId}`);

export const clearCartRequest = () => axios.delete("/cart");
