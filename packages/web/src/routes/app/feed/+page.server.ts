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
  const page = await caller(event).newest.query({ page: 1 });

  const initial = {
    pages: [page],
    pageParams: [1],
  } satisfies InfiniteData<typeof page>;

  return {
    initial,
  };
}
