import { createContext, useContext } from "react";
import type { CartProduct } from "../../types/cart";

type CartContext = {
  loading: boolean;
  cart: CartProduct[];
  addToCart: (productId: string, productName: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContext | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
