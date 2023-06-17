import { initTRPC } from "@trpc/server";
import { IncomingHttpHeaders } from "http";

/**
 * The router context.
 */
type Context = {
  headers: IncomingHttpHeaders;
};

/**
 * The TRPC configuration namespace.
 */
export const t = initTRPC.context<Context>().create();

export const { router, procedure } = t;
