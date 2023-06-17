import { PUBLIC_HN_API } from "$env/static/public";
import { TechFeedList } from "@/lib/types";
import { createInfiniteQuery } from "@tanstack/svelte-query";

/**
 * Get the latest feeds from the public api
 */
export async function feeds(args: { page?: number }) {
  const page = args.page ?? 1;
  const res = await fetch(`${PUBLIC_HN_API}/news?page=${page}`);
  const data = await res.json();

  const feeds = await TechFeedList.parseAsync(data);

  return {
    feeds,
    page,
  };
}

/**
 * Create a query store for getting the latest feeds
 */
export function createFeedsQuery() {
  return createInfiniteQuery({
    queryKey: ["app", "feeds"],
    queryFn: ({ pageParam }) => feeds({ page: pageParam }),
    getNextPageParam: ({ page }) => page + 1,
  });
}

/**
 * Get the hottest feeds from the public api
 */
export async function glance(args: { page?: number }) {
  const page = args.page ?? 1;
  const res = await fetch(`${PUBLIC_HN_API}/newest?page=${page}`);
  const data = await res.json();

  const feeds = await TechFeedList.parseAsync(data);

  return {
    feeds,
    page,
  };
}

/**
 * Create a query store for getting the hottest feeds
 */
export function createGlanceQuery() {
  return createInfiniteQuery({
    queryKey: ["app", "glance"],
    queryFn: ({ pageParam }) => glance({ page: pageParam }),
    getNextPageParam: ({ page }) => page + 1,
  });
}
