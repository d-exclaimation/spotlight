import { PUBLIC_HN_API } from "$env/static/public";
import { TechFeedList } from "@/lib/types";

export async function feeds(args: { page?: number }) {
  const page = args.page ?? 1;
  const res = await fetch(`${PUBLIC_HN_API}/newest?page=${page}`);
  const data = await res.json();

  const feeds = await TechFeedList.parseAsync(data);

  return {
    feeds,
    page,
  };
}

export async function discover(args: { page?: number }) {
  const page = args.page ?? 1;
  const res = await fetch(`${PUBLIC_HN_API}/news?page=${page}`);
  const data = await res.json();

  const feeds = await TechFeedList.parseAsync(data);

  return {
    feeds,
    page,
  };
}
