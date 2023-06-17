import { browser } from "$app/environment";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import { trpc, type MutationsOpts } from "./trpc";

export function createMeQuery() {
  return createQuery({
    queryKey: ["users", "me"],
    queryFn: () => trpc.me.query(),
    enabled: browser,
  });
}

export function createWaitlistMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"preregister">) {
  return createMutation({
    mutationKey: ["preregister", mutationKey],
    mutationFn: trpc.preregister.mutate,
    ...rest,
  });
}

export function createLoginMutation({
  mutationKey,
  ...rest
}: MutationsOpts<"login">) {
  return createMutation({
    mutationKey: ["login", "first", mutationKey],
    mutationFn: trpc.login.mutate,
    ...rest,
  });
}

export function createLogin2Mutation({
  mutationKey,
  ...rest
}: MutationsOpts<"login2">) {
  return createMutation({
    mutationKey: ["login", "second", mutationKey],
    mutationFn: trpc.login2.mutate,
    ...rest,
  });
}
