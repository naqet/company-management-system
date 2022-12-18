import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import bcrypt from "bcrypt";
import withMethodValidation from "../../../middlewares/withMethodValidation";
import withMiddleware from "../../../middlewares/withMiddleware";
import withValidation from "../../../middlewares/withValidation";
import signUpSchema, { SignUpSchema } from "../../../schemas/SignUpSchema";
import { createUser, getUserByEmail } from "../../../prisma/repositories/User";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: SignUpSchema;
}

async function signUpHandler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { email, password, name } = req.body;
  const user = await getUserByEmail(email);

  if (user) throw new ApiError(400, "This email has already been used");

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser({ email, name, passwordHash });

  res.redirect("/login");
}

export default withMiddleware(
  withMethodValidation(["POST"]),
  withValidation(signUpSchema),
  signUpHandler
);
