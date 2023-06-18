import { initTRPC } from "@trpc/server";
import type { InferModel } from "drizzle-orm";
import { IncomingHttpHeaders } from "http";
import type { users } from "../data/schema.js";

/**
 * The router context.
 */
type Context = {
  headers: IncomingHttpHeaders;
  user?: InferModel<typeof users>;
};

/**
 * The TRPC configuration namespace.
 */
export const t = initTRPC.context<Context>().create();

export const { router, procedure, mergeRouters } = t;
