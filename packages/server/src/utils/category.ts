import { z } from "zod";
/**
 * The category of the news.
 */
export type Category = z.infer<typeof Category>;
export const Category = z.nativeEnum({
  tech: "tech",
  ai: "ai",
  politic: "politic",
  history: "history",
  jobs: "jobs",
  uncategorized: "uncategorized",
  world: "world",
  finance: "finance",
  science: "science",
  sport: "sport",
} as const);
