import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Username is required",
  }),

  email: z
    .string({
      error: "Email is required",
    })
    .trim()
    .email({
      error: "Invalid email address",
    }),

  password: z
    .string({
      error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      error: "Email is required",
    })
    .trim()
    .email({
      error: "Invalid email address",
    }),

  password: z
    .string({
      error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});
