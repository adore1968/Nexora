import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(1, {
    message: "Username is required",
  }),

  email: z.email({
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
  email: z.email({
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

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
