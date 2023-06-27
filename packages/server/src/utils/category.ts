import { z } from "zod";

/**
 * The category of the news.
 */
export const categories = {
  tech: "tech",
  ai: "ai",
  politic: "politic",
  history: "history",
  jobs: "jobs",
  uncategorized: "uncategorized",
} as const;

/**
 * The category of the news.
 */
export type Category = z.infer<typeof Category>;
export const Category = z.enum([
  categories.tech,
  categories.politic,
  categories.jobs,
  categories.uncategorized,
]);
