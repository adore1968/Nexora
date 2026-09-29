import { createContext, useContext } from "react";
import type {
  CreateProduct,
  Product,
  UpdateProduct,
} from "../../types/products";

interface ProductsContextType {
  loading: boolean;
  products: Product[];
  getProduct: (id: string) => Promise<Product | undefined>;
  createProduct: (product: CreateProduct) => void;
  updateProduct: (id: string, product: UpdateProduct) => void;
  deleteProduct: (id: string) => void;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
};
