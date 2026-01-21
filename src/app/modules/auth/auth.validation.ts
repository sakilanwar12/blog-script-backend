import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
export const refreshTokenValidationSchema = z.object({
  refreshToken: z
    .string({
      message: "Refresh token is required",
    })
    .min(1, "Refresh token cannot be empty"),
});
