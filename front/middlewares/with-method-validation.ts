import { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const isMethod = (method: any): method is Method => {
  return (method as Method) !== undefined;
};

const withMethodValidation =
  (methods: Method[]) =>
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (
      typeof req.method === "undefined" ||
      (isMethod(req.method) && !methods.includes(req.method))
    ) {
      res.setHeader("Allow", methods);
      res.status(405).send(`Method Not Allowed`);
      return;
    }

    return handler(req, res);
  };

export default withMethodValidation;
