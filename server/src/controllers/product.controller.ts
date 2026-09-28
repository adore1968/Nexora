import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import {
  CreateProductBody,
  UpdateProductBody,
} from "../schemas/product.schema.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (
  req: Request<{}, {}, CreateProductBody>,
  res: Response,
) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image,
      user: req.user.id,
    });

    const productSaved = await newProduct.save();

    return res.status(201).json(productSaved);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, {}, UpdateProductBody>,
  res: Response,
) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    const { id } = req.params;

    const productUpdated = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, category, image },
      { new: true },
    );

    if (!productUpdated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(productUpdated);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const productDeleted = await Product.findByIdAndDelete(id);

    if (!productDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
