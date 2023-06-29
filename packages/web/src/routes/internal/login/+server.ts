import { setProxyToken } from "@/lib/server/cookie.js";
import type { Config } from "@sveltejs/adapter-vercel";
import { json } from "@sveltejs/kit";

export const config = {
  runtime: "edge",
} satisfies Config;

export function POST(event) {
  const [kind, token] =
    event.request.headers.get("authorization")?.split(" ") ?? [];
  if (kind !== "Bearer") return json({ success: false });

  setProxyToken(event, token);
  return json({ success: true });
}
