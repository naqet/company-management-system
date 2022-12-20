import type { NextApiRequest, NextApiResponse } from "next";
import withMethodValidation from "../../../middlewares/withMethodValidation";
import withMiddleware from "../../../middlewares/withMiddleware";

async function signUpHandler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    "Authentication=empty; Max-Age=-1; HttpOnly; Secure; Path=/; SameSite=Strict;"
  );
  res.redirect("/signin");
}

export default withMiddleware(withMethodValidation(["POST"]), signUpHandler);
