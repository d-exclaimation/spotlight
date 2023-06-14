import { PUBLIC_API_URL } from "$env/static/public";
import type { App } from "@spotlight/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { auth } from "../utils/storage";

export const trpc = createTRPCProxyClient<App>({
  links: [
    httpBatchLink({
      url: PUBLIC_API_URL,
      headers(opts) {
        const jwt = auth.get();
        return {
          Authorization: jwt ? `Bearer ${jwt.token}` : undefined,
        };
      },
    }),
  ],
});
