import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const isMethod = (method: any): method is Method => {
  return (method as Method) !== undefined;
};

const withMethodValidation =
  (methods: Method[]) =>
  (req: NextApiRequest, res: NextApiResponse) =>
  (handler: NextApiHandler) => {
    if (
      typeof req.method === "undefined" ||
      (isMethod(req.method) && !methods.includes(req.method))
    ) {
      throw new ApiError(403, "Method Not Allowed");
    }

    return handler(req, res);
  };

export default withMethodValidation;
