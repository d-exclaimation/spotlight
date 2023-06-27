import { createQuery } from "@tanstack/svelte-query";
import { trpc, type QueryOpts } from "./trpc";

/**
 * Create a query store for user dashboard stastics
 */
export function createDashboardQuery({
  queryKey: _,
  ...rest
}: QueryOpts<"dashboard"> = {}) {
  return createQuery({
    queryKey: ["users", "me", "dashboard"] as unknown[],
    queryFn: () => trpc.dashboard.query(),
    retry: 1,
    ...rest,
  });
}
