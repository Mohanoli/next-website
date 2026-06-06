import * as z from 'zod';
import { passwordRule,emailRule,usernameRule } from '../rules/Regex';


 // Register Schema
export const registerSchema = z.object({
    username: z.string().trim().regex(usernameRule,
        "Username must be 3–20 characters and contain only letters and numbers"),

    email: z.string().trim().regex(emailRule, "Invalid email address"),
    password: z.string().regex(passwordRule,
        "Password must be 8–64 characters and include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  // Login Schema
export const loginSchema = z.object({
  email: z.string().trim().regex(emailRule, "Invalid email address"),
  password: z.string().min(1, "Password is required"),
});