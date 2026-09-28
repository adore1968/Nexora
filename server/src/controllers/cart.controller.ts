import { Request, Response } from "express";
import { Cart, CartType } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { AddToCartBody, UpdateCartItemBody } from "../schemas/cart.schema.js";
import { Types } from "mongoose";

const saveAndPopulateCart = async (cart: CartType): Promise<CartType> => {
  await cart.save();
  await cart.populate("products.product");
  return cart;
};

export const getCart = async (req: Request, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product",
    );

    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
      await cart.save();
    }

    return res.json(cart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (
  req: Request<{}, {}, AddToCartBody>,
  res: Response,
) => {
  try {
    const { productId } = req.body;

    const productFound = await Product.findById(productId);

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productFound.stock <= 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (productIndex !== -1) {
      if (cart.products[productIndex].quantity >= productFound.stock) {
        return res.status(400).json({ message: "No more stock available" });
      }

      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: new Types.ObjectId(productId),
        quantity: 1,
      });
    }

    const updatedCart = await saveAndPopulateCart(cart);

    return res.json(updatedCart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCartItem = async (
  req: Request<{ productId: string }, {}, UpdateCartItemBody>,
  res: Response,
) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    const productFound = await Product.findById(productId);

    if (!productFound) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > productFound.stock) {
      return res.status(400).json({ message: "No more stock available" });
    }

    cart.products[productIndex].quantity = quantity;

    const updatedCart = await saveAndPopulateCart(cart);

    return res.json(updatedCart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (
  req: Request<{ productId: string }>,
  res: Response,
) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1);

    const updatedCart = await saveAndPopulateCart(cart);

    return res.json(updatedCart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];

    await cart.save();

    return res.json(cart);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
