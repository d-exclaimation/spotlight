import { createMutation, createQuery } from "@tanstack/svelte-query";
import { internal, type InternalMutationsOpts } from "./internal";
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
    mutationFn: async (input) => {
      const res = await trpc.login2.mutate(input);
      if (res.token) {
        await internal.login(res.token);
      }
      return res;
    },
    ...rest,
  });
}

/**
 * Create a mutation store for signing up
 */
export function createSignupMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"signup"> = {}) {
  return createMutation({
    mutationKey: ["signup", "first", mutationKey],
    mutationFn: trpc.signup.mutate,
    ...rest,
  });
}

/**
 * Create a mutation store for signing up (step 2)
 */
export function createSignup2Mutation({
  mutationKey,
  ...rest
}: MutationsOpts<"signup2"> = {}) {
  return createMutation({
    mutationKey: ["signup", "second", mutationKey],
    mutationFn: async (input) => {
      const res = await trpc.signup2.mutate(input);
      if (res.token) {
        await internal.login(res.token);
      }
      return res;
    },
    ...rest,
  });
}

/**
 * Create a mutation store for refreshing the logged in user
 */
export function createRefreshMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"refresh"> = {}) {
  return createMutation({
    mutationKey: ["refresh", mutationKey],
    mutationFn: async (input) => {
      const res = await trpc.refresh.mutate(input);
      if (res.token) {
        await internal.login(res.token);
      }
      return res;
    },
    ...rest,
  });
}

/**
 * Create a mutation store for logging out a user
 */
export function createLogoutMutation({
  mutationKey,
  ...rest
}: InternalMutationsOpts = {}) {
  return createMutation({
    mutationKey: ["logout", mutationKey],
    mutationFn: internal.logout,
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
