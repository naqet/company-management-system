import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import bcrypt from "bcrypt";
import withMethodValidation from "../../../middlewares/withMethodValidation";
import withMiddleware from "../../../middlewares/withMiddleware";
import withValidation from "../../../middlewares/withValidation";
import { getUserByEmail } from "../../../prisma/repositories/User";
import signInSchema, { SignInSchema } from "../../../schemas/SignInSchema";
import jwt from "jsonwebtoken";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: SignInSchema;
}

async function signInHandler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) throw new ApiError(404, "Invalid email or password");

  const passwordHash = await bcrypt.compare(password, user.passwordHash);

  if (!passwordHash) throw new ApiError(404, "Invalid email or password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: "7 days" }
  );
  res.setHeader(
    "Set-Cookie",
    `Authentication=Bearer ${token}; Max-Age=604800; HttpOnly; Secure; Path=/; SameSite=Strict`
  );
  res.redirect("/");
}

export default withMiddleware(
  withMethodValidation(["POST"]),
  withValidation(signInSchema),
  signInHandler
);
