import type { Config } from "@sveltejs/adapter-vercel";
import { error } from "@sveltejs/kit";

export const config = {
  runtime: "edge",
} satisfies Config;

export function load() {
  throw error(404, "Not found");
}
