import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export default signInSchema;
