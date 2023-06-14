import { browser } from "$app/environment";
import { createQuery } from "@tanstack/svelte-query";
import { trpc } from "./trpc";

export function createMeQuery() {
  return createQuery({
    queryKey: ["users", "me"],
    queryFn: () => trpc.me.query(),
    enabled: browser,
  });
}
