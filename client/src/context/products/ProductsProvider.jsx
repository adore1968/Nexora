import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  getProductsRequest,
  getProductRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../../api/products";
import { toast } from "react-toastify";

function ProductsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      setProducts((prevProducts) => [...prevProducts, res.data]);
      toast.success("Product created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  const updateProduct = async (id, product) => {
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
      toast.error(error.response?.data?.message || "Error adding product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product removed");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error removing product");
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
