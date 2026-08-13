import { z } from "zod";

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid product ID",
  });
export const addToCartSchema = z.object({
  productId: objectIdSchema,
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, {
    message: "Quantity must be at least 1",
  }),
});
