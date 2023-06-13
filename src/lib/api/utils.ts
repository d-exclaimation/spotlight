import type { z } from "zod";
type Fetch = typeof fetch;
export function simple<T>(fn: (args: { fetch: Fetch }) => Promise<T>) {
  return async (_fetch: Fetch = fetch) => {
    return await fn({ fetch: _fetch });
  };
}

export function query<In extends z.ZodTypeAny, Out>(
  _input: In,
  fn: (input: z.infer<In>, ctx: { fetch: Fetch }) => Promise<Out>
) {
  return async (input: z.infer<In>, _fetch: Fetch = fetch) => {
    return await fn(input, { fetch: _fetch });
  };
}
