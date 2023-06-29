import { caller } from "@/lib/server/trpc";
import type { Config } from "@sveltejs/adapter-vercel";
import type { InfiniteData } from "@tanstack/svelte-query";

export const config = {
  runtime: "edge",
} satisfies Config;

export async function load(event) {
  if (event.isDataRequest) {
    return { initial: undefined };
  }
  try {
    const page = await caller(event).curation.query({ page: 1 });

    const initial =
      page.news.length !== 0
        ? ({
            pages: [page],
            pageParams: [1],
          } satisfies InfiniteData<typeof page>)
        : undefined;

    return {
      initial,
    };
  } catch (e) {
    console.error(e);
    return {
      initial: undefined,
    };
  }
}
