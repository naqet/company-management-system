import type { NextApiRequest, NextApiResponse } from "next";
import withMethodValidation from "../../../middlewares/withMethodValidation";
import withMiddleware from "../../../middlewares/withMiddleware";
import withValidation from "../../../middlewares/withValidation";
import signUpSchema from "../../../schemas/SignUpSchema";

async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  res.send("Success");
}

export default withMiddleware(
  withMethodValidation(["POST"]),
  withValidation(signUpSchema),
  signUpHandler
);
