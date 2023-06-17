import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { App } from "./trpc/index.js";

export type AppInput = inferRouterInputs<App>;
export type AppOutput = inferRouterOutputs<App>;

export type { App } from "./trpc/index.js";
