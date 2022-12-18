import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

type Middleware = (req: NextApiRequest, res: NextApiResponse) => unknown;

const withMiddleware =
  (...middlewares: Middleware[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const evaluateHandler = async (
      middleware: Middleware,
      innerMiddleware?: Middleware
    ) => {
      try {
        if (res.headersSent) return;

        if (typeof middleware !== "function") return;

        const handler = await middleware(req, res);

        if (typeof handler !== "function") return;

        if (!innerMiddleware) {
          await handler();
          return;
        }

        await handler(innerMiddleware);
      } catch (e) {
        if (e instanceof ApiError) {
          res.status(e.statusCode).send(e.message);
          return;
        } else {
          res.status(500).send("Internal Server Error");
          return;
        }
      }
    };

    for (let index = 0; index < middlewares.length; index++) {
      const middleware = middlewares[index];
      const nextMiddleware = middlewares[index + 1];

      await evaluateHandler(middleware, nextMiddleware);
    }
  };

export default withMiddleware;
