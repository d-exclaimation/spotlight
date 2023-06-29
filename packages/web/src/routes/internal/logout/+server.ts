import { clearProxyToken } from "@/lib/server/cookie.js";
import type { Config } from "@sveltejs/adapter-vercel";
import { json } from "@sveltejs/kit";

export const config = {
  runtime: "edge",
} satisfies Config;

export async function POST(event) {
  clearProxyToken(event);
  return json({ success: true });
}
