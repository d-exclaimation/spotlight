import { PUBLIC_API_URL } from "$env/static/public";
import type { App, AppInput, AppOutput } from "@spotlight/server";
import type {
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
  CreateQueryOptions,
} from "@tanstack/svelte-query";
import {
  TRPCClientError,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client";
import { auth } from "../utils/storage";

/**
 * tRPC client for the spotlight API
 */
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

/**
 * Get the tanstack mutation options for any mutation using the trpc client
 */
export type MutationsOpts<T extends keyof typeof trpc> = Omit<
  CreateMutationOptions<AppOutput[T], unknown, AppInput[T]>,
  "mutationFn"
>;

/**
 * Get the tanstack query options for any query using the trpc client
 */
export type QueryOpts<T extends keyof typeof trpc> = Omit<
  CreateQueryOptions<AppOutput[T], unknown, AppOutput[T], unknown[]>,
  "queryFn"
>;

/**
 * Get the tanstack infinite query options for any infinite query using the trpc client
 */
export type InfiniteQueryOpts<T extends keyof typeof trpc> = Omit<
  CreateInfiniteQueryOptions<
    AppOutput[T],
    unknown,
    AppOutput[T],
    AppOutput[T],
    unknown[]
  >,
  "queryFn"
>;

/**
 * Get the user auth
 */
export type Me = AppOutput["me"]["user"];

/**
 * Check if an error is a TRPC error
 * @param error An error
 * @returns True if the error is a TRPC error
 */
export function isTRPCError(error: unknown): error is TRPCClientError<App> {
  return error instanceof TRPCClientError;
}
