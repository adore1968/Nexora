import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
