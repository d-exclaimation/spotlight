import { browser } from "$app/environment";
import { QueryClient } from "@tanstack/svelte-query";
export async function load() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute stale time
        cacheTime: 1000 * 60 * 5, // 5 minutes cache time
        enabled: browser,
      },
    },
  });

  return { queryClient };
}
