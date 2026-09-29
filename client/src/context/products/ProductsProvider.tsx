import { useEffect, useState, type ReactNode } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  getProductsRequest,
  getProductRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../../api/products";
import { toast } from "react-toastify";
import {
  type CreateProduct,
  type Product,
  type UpdateProduct,
} from "../../types/products";
import axios from "axios";

interface ProductsProviderProps {
  children: ReactNode;
}

function ProductsProvider({ children }: ProductsProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  const getProduct = async (id: string): Promise<Product | undefined> => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product: CreateProduct) => {
    try {
      const res = await createProductRequest(product);
      setProducts((prevProducts) => [...prevProducts, res.data]);
      toast.success("Product created successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error adding product");
      }
    }
  };

  const updateProduct = async (id: string, product: UpdateProduct) => {
    try {
      const res = await updateProductRequest(id, product);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === res.data._id ? res.data : product,
        ),
      );
      toast.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error adding product");
      }
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteProductRequest(id);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product removed");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error removing product");
      }
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getProductsRequest();

        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        loading,
        products,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
