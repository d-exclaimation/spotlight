import { PRIVATE_API_KEY } from "$env/static/private";
import { PUBLIC_API_URL } from "$env/static/public";
import type { App } from "@spotlight/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

/**
 * Server only tRPC client for the spotlight API
 */
export const strpc = createTRPCProxyClient<App>({
  links: [
    httpBatchLink({
      url: PUBLIC_API_URL,
      headers() {
        return {
          Authorization: `Key ${PRIVATE_API_KEY}`,
        };
      },
    }),
  ],
});
