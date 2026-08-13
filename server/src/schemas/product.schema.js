import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),

  description: z.string().trim().min(1, {
    message: "Description is required",
  }),

  price: z.number().min(0, {
    message: "Price must be greater than or equal to 0",
  }),

  stock: z.number().int().min(0, {
    message: "Stock must be greater than or equal to 0",
  }),

  category: z.string().trim().min(1, {
    message: "Category is required",
  }),

  image: z.string().trim().url({
    message: "Image must be a valid URL",
  }),
});

export const updateProductSchema = createProductSchema.partial();
