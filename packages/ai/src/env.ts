import { z } from "zod";

/**
 * The type of expected environment variables.
 */
export type Env = z.infer<typeof Env>;
export const Env = z.object({
  // News source configuration
  NEWS_SOURCE_1: z.string(),
  NEWS_REDIRECT_1: z.string(),
});

/**
 * Fully type-safe environment variables.
 */
export const env = Env.parse(process.env);
