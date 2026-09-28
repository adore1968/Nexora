import { Router } from "express";
import authRequired from "../middlewares/authRequired.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  addToCartSchema,
  updateCartItemSchema,
} from "../schemas/cart.schema.js";

const router = Router();

router.get("/", authRequired, getCart);

router.post("/", authRequired, validateSchema(addToCartSchema), addToCart);

router.put(
  "/:productId",
  authRequired,
  validateSchema(updateCartItemSchema),
  updateCartItem,
);

router.delete("/:productId", authRequired, removeFromCart);

router.delete("/", authRequired, clearCart);

export default router;
