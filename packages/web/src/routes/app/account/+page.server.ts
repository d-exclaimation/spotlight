import { caller } from "@/lib/server/trpc";
import type { Config } from "@sveltejs/adapter-vercel";

export const config = {
  runtime: "edge",
} satisfies Config;

export async function load(event) {
  if (event.isDataRequest) {
    return { initial: undefined };
  }
  try {
    const data = await caller(event).dashboard.query();
    const initial = data.user ? { user: data.user } : undefined;
    return { initial };
  } catch (e) {
    console.error(e);
    return {
      initial: undefined,
    };
  }
}
