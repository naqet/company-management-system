import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Passoword must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Passoword must contain at least 8 characters"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export default signUpSchema;
