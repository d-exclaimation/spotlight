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

    if (page.news.length === 0) {
      return {
        initial: undefined,
      };
    }

    const initial = {
      pages: [page],
      pageParams: [page.page],
    } satisfies InfiniteData<typeof page>;

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
