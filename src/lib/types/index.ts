import { z } from "zod";

/**
 * The type of the data returned by the Hacker News API.
 */
export type TechFeed = z.infer<typeof TechFeed>;
export const TechFeed = z.object({
  id: z.number().int(),
  title: z.string(),
  points: z.number().int().nullish(),
  user: z.string().nullish(),
  time: z.coerce.date(),
  time_ago: z.string(),
  comments_count: z.number().int(),
  type: z.union([z.literal("link"), z.literal("ask"), z.literal("job")]),
  url: z.string(),
  domain: z.string().optional(),
});

/**
 * An array of TechFeed items.
 */
export type TechFeedList = z.infer<typeof TechFeedList>;
export const TechFeedList = z.array(TechFeed);
