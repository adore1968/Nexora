import type { CreateProduct, Product, UpdateProduct } from "../types/products";
import axios from "./axios";

export const getProductsRequest = () => axios.get<Product[]>("/products");

export const getProductRequest = (id: string) =>
  axios.get<Product>(`/products/${id}`);

export const createProductRequest = (product: CreateProduct) =>
  axios.post<Product>("/products", product);

export const updateProductRequest = (id: string, product: UpdateProduct) =>
  axios.put<Product>(`/products/${id}`, product);

export const deleteProductRequest = (id: string) =>
  axios.delete(`/products/${id}`);
