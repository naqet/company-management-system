import type { NextApiRequest, NextApiResponse } from "next";
import withMethodValidation from "../../../middlewares/with-method-validation";
import withValidation from "../../../middlewares/with-validation";
import signUpSchema from "../../../schemas/SignUpSchema";

function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  res.send("Success");
}

export default withMethodValidation(["POST"])(
  withValidation(signUpSchema)(signUpHandler)
);
