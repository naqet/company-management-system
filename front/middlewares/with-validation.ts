import { NextApiRequest, NextApiResponse } from "next";
import { ZodError, ZodSchema } from "zod";

const withValidation =
  (schema: ZodSchema) =>
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  (req: NextApiRequest, res: NextApiResponse) => {
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
