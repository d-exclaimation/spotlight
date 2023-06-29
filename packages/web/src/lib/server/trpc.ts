import { PUBLIC_API_URL } from "$env/static/public";
import type { App } from "@spotlight/server";
import type { RequestEvent } from "@sveltejs/kit";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

/**
 * Get the tRPC caller for the current svelte-kit event.
 */
export function caller<T extends RequestEvent<any, any>>(event: T) {
  const proxyToken = event.cookies.get("proxy-token");
  return createTRPCProxyClient<App>({
    links: [
      httpBatchLink({
        url: PUBLIC_API_URL,

        headers() {
          return {
            Authorization: proxyToken ? `Proxy ${proxyToken}` : undefined,
          };
        },
      }),
    ],
  });
}
