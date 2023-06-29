import { createMutation, createQuery } from "@tanstack/svelte-query";
import { trpc, type MutationsOpts, type QueryOpts } from "./trpc";

/**
 * Create a query store for checking if the logged in user info, if any
 */
export function createMeQuery({ queryKey: _, ...rest }: QueryOpts<"me"> = {}) {
  return createQuery({
    queryKey: ["users", "me"] as unknown[],
    queryFn: () => trpc.me.query(),
    retry: 1,
    ...rest,
  });
}

/**
 * Create a mutation store for registering a new user to the waitlist
 */
export function createWaitlistMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"preregister"> = {}) {
  return createMutation({
    mutationKey: ["preregister", mutationKey],
    mutationFn: trpc.preregister.mutate,
    ...rest,
  });
}

/**
 * Create a mutation store for logging in a user (step 1)
 */
export function createLoginMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"login"> = {}) {
  return createMutation({
    mutationKey: ["login", "first", mutationKey],
    mutationFn: trpc.login.mutate,
    ...rest,
  });
}

/**
 * Create a mutation store for logging in a user (step 2)
 */
export function createLogin2Mutation({
  mutationKey,
  ...rest
}: MutationsOpts<"login2"> = {}) {
  return createMutation({
    mutationKey: ["login", "second", mutationKey],
    mutationFn: trpc.login2.mutate,
    ...rest,
  });
}

/**
 * Create a mutation store for logging out a user
 */
export function createLogoutMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"logout"> = {}) {
  return createMutation({
    mutationKey: ["logout", mutationKey],
    mutationFn: trpc.logout.mutate,
    ...rest,
  });
}

/**
 * Create a mutation store for editing a user
 */
export function createEditMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"edit"> = {}) {
  return createMutation({
    mutationKey: ["users", "me", "edit", mutationKey],
    mutationFn: trpc.edit.mutate,
    ...rest,
  });
}
