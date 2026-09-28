export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  category: string;
  image: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  stock: string;
  category: string;
  image: string;
}

export type UpdateProduct = Partial<CreateProduct>;
