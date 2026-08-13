import Router from "express";
import authRequired from "../middlewares/authRequired.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  authRequired,
  isAdmin,
  validateSchema(createProductSchema),
  createProduct,
);

router.put(
  "/:id",
  authRequired,
  isAdmin,
  validateSchema(updateProductSchema),
  updateProduct,
);

router.delete("/:id", authRequired, isAdmin, deleteProduct);

export default router;
