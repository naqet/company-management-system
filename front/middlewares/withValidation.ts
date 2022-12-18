import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ZodError, ZodSchema } from "zod";

const withValidation =
  (schema: ZodSchema) =>
  (req: NextApiRequest, res: NextApiResponse) =>
  (handler: NextApiHandler) => {
    try {
      schema.parse(req.body);
      return handler(req, res);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json(e.errors);
        return;
      }
    }
  };

export default withValidation;
