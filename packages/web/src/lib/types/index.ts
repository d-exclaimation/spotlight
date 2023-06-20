import { z } from "zod";

/**
 * A safe int coersion
 */
export const int = z.coerce.number();

/**
 * A safe date coersion
 */
export const datestring = z.coerce.date();

/**
 * The local stored auth data.
 */
export type Auth = z.infer<typeof Auth>;
export const Auth = z.object({
  token: z.string(),
});
