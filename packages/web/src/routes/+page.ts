import type { Config } from "@sveltejs/adapter-vercel";

export const config = {
  runtime: "edge",
} satisfies Config;
export async function load() {}
