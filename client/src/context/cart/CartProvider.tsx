import { useEffect, useState, type ReactNode } from "react";
import { CartContext } from "./CartContext";
import {
  addToCartRequest,
  getCartRequest,
  removeFromCartRequest,
  updateCartItemRequest,
  clearCartRequest,
} from "../../api/cart";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import { type Cart, type CartProduct } from "../../types/cart";
import axios from "axios";

type CartProviderProps = {
  children: ReactNode;
};

function CartProvider({ children }: CartProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const { user, loading: authLoading } = useAuth();

  const addToCart = async (productId: string, productName: string) => {
    try {
      const res = await addToCartRequest(productId);
      setCart(res.data.products);
      toast.success(`${productName} added to the cart`);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error adding product to cart",
        );
      }
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      const res = await updateCartItemRequest(productId, quantity);
      setCart(res.data.products);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error updating cart");
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await removeFromCartRequest(productId);
      setCart(res.data.products);
      toast.success(`Product successfully removed from cart`);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error removing product from cart",
        );
      }
    }
  };

  const clearCart = async () => {
    try {
      await clearCartRequest();
      setCart([]);
      toast.success(`Cart successfully cleared`);
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Error clearing cart");
      }
    }
  };

  useEffect(() => {
    const getCart = async () => {
      if (authLoading) {
        return;
      }

      if (!user) {
        setCart([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const res = await getCartRequest();
        setCart(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
