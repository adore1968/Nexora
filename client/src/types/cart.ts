import type { Product } from "./products";

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}
