import { z } from "zod";
import { env } from "../config/env.js";

/**
 * A news item from News Source 1.
 */
export type NewsItem = z.infer<typeof NewsItem>;
export const NewsItem = z.object({
  id: z.number().int(),
  title: z.string(),
  points: z.number().int().nullish(),
  user: z.string().nullish(),
  time_ago: z.string(),
  comments_count: z.number().int(),
  type: z
    .union([
      z.literal("link"),
      z.literal("ask"),
      z.literal("job"),
      z.literal("poll"),
    ])
    .catch("link"),
  url: z.string(),
  domain: z.string().optional(),
});

/**
 * An array of news items.
 */
export type NewsItemSet = z.infer<typeof NewsItemSet>;
export const NewsItemSet = z.array(NewsItem);

/**
 * Collect news items from News Source 1. No aggregation, categorisation, and caching is performed.
 */
export type Collect = {
  sort: "newest" | "best" | "news";
  page?: number;
};

/**
 * Collect news items from News Source 1. No aggregation, categorisation, and caching is performed.
 */
export async function collect({ sort, page }: Collect) {
  const res = await fetch(`${env.NEWS_SOURCE_1}/${sort}?page=${page ?? 1}`);
  const data = await res.json();
  const items = await NewsItemSet.parseAsync(data);

  return {
    news: items.map((item) => ({
      ...item,
      url: link(item.url),
    })),
    page: page ?? 1,
  };
}

/**
 * Fix links to be absolute
 */
export function link(url: string) {
  if (url.startsWith("/item?")) {
    return `${env.NEWS_REDIRECT_1}${url}`;
  }
  if (url.startsWith("item?")) {
    return `${env.NEWS_REDIRECT_1}/${url}`;
  }
  return url;
}
