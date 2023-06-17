import { PUBLIC_API_URL } from "$env/static/public";
import type { App, AppInput, AppOutput } from "@spotlight/server";
import type {
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
  CreateQueryOptions,
} from "@tanstack/svelte-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { auth } from "../utils/storage";

export const trpc = createTRPCProxyClient<App>({
  links: [
    httpBatchLink({
      url: PUBLIC_API_URL,
      headers() {
        const jwt = auth.get();
        return {
          Authorization: jwt ? `Bearer ${jwt.token}` : undefined,
        };
      },
    }),
  ],
});

export type MutationsOpts<T extends keyof typeof trpc> = Omit<
  CreateMutationOptions<AppOutput[T], unknown, AppInput[T]>,
  "mutationFn"
>;

export type QueryOpts<T extends keyof typeof trpc> = CreateQueryOptions<
  AppOutput[T],
  unknown,
  AppInput[T]
>;

export type InfiniteQueryOpts<T extends keyof typeof trpc> =
  CreateInfiniteQueryOptions<AppOutput[T], unknown, AppInput[T]>;
