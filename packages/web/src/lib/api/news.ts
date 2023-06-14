import { PUBLIC_HN_API } from "$env/static/public";
import { TechFeedList } from "@/lib/types";
import { z } from "zod";
import { query } from "./utils";

export const news = query(
  z.object({ page: z.number().optional() }),
  async (args, { fetch }) => {
    const page = args.page ?? 1;
    const res = await fetch(`${PUBLIC_HN_API}/news?page=${page}`);
    const data = await res.json();

    const feeds = await TechFeedList.parseAsync(data);

    return {
      feeds,
      page,
    };
  }
);

export const best = query(
  z.object({ page: z.number().optional() }),
  async (args, { fetch }) => {
    const page = args.page ?? 1;
    const res = await fetch(`${PUBLIC_HN_API}/best?page=${page}`);
    const data = await res.json();

    const feeds = await TechFeedList.parseAsync(data);

    return {
      feeds,
      page,
    };
  }
);
