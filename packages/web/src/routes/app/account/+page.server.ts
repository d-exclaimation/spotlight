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
    const initial = await caller(event).dashboard.query();

    if (!initial.user) {
      return {
        initial: undefined,
      };
    }

    return { initial };
  } catch (e) {
    console.error(e);
    return {
      initial: undefined,
    };
  }
}
