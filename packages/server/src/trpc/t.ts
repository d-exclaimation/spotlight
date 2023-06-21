import { initTRPC } from "@trpc/server";
import type {
  IncomingHttpHeaders,
  IncomingMessage,
  ServerResponse,
} from "http";
import type { AuthUser } from "../utils/auth.js";

/**
 * The router context.
 */
type Context = {
  headers: IncomingHttpHeaders;
  auth: AuthUser;
  res: ServerResponse<IncomingMessage>;
};

/**
 * The TRPC configuration namespace.
 */
export const t = initTRPC.context<Context>().create();

export const { router, procedure, mergeRouters } = t;
