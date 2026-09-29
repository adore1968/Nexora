import type { Product } from "./products";

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
}
