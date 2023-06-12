import { PUBLIC_HN_API } from "$env/static/public";
import { TechFeedList } from "@/lib/types";
import { query } from "./utils";

export const news = query(async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_HN_API}/news`);
  const data = await res.json();

  const feeds = await TechFeedList.parseAsync(data);

  return feeds;
});
