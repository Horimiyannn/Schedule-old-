import { initTRPC } from "@trpc/server";
import { Context } from "./context"; 

const t = initTRPC.context<Context>().create();


export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    return next({
      ctx: { user: ctx.user },
    });
  });
  