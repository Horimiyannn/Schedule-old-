import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import cors from "cors";
import { AppContext, createAppContext } from "./ctx";
import { trpcRouter } from "./trpc/trpc";

void (async () => {
  try {
    const expressApp = express();

    expressApp.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    expressApp.use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: trpcRouter,
      })
    );

    expressApp.listen(3000, () => {
      console.info("Listening at http://localhost:3000");
    });
  } catch (error) {
    console.error(error);
  }
})();
