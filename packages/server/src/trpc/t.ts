import { initTRPC } from "@trpc/server";
import { IncomingHttpHeaders } from "http";

type Context = {
  headers: IncomingHttpHeaders;
};

const t = initTRPC.context<Context>().create();

export const { router, procedure } = t;
