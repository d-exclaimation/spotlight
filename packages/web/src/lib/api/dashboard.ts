import { createMutation, createQuery } from "@tanstack/svelte-query";
import { trpc, type MutationsOpts, type QueryOpts } from "./trpc";

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

/**
 * Create a mutation store for tracking engagement
 */
export function createEngangementMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"trackEngagement"> = {}) {
  return createMutation({
    mutationKey: ["users", "me", "engage", mutationKey],
    mutationFn: trpc.trackEngagement.mutate,
    ...rest,
  });
}

/**
 * Create a mutation store for clearing user data
 */
export function createClearDataMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"clearData"> = {}) {
  return createMutation({
    mutationKey: ["users", "me", "clear", mutationKey],
    mutationFn: trpc.clearData.mutate,
    ...rest,
  });
}
