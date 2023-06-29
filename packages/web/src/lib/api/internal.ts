import type { CreateMutationOptions } from "@tanstack/svelte-query";

/**
 * Get the tanstack mutation options for any mutation using the internal client
 */
export type InternalMutationsOpts = Omit<
  CreateMutationOptions<void, unknown, void>,
  "mutationFn"
>;

export const internal = {
  async logout() {
    console.log("Logging out");
    await fetch("/internal/logout", {
      method: "POST",
    });
  },
  async login(token: string) {
    console.log("Logging in");
    await fetch("/internal/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
