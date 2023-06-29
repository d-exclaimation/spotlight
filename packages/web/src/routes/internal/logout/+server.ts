import { clearProxyToken } from "@/lib/server/cookie.js";
import { json } from "@sveltejs/kit";

export async function POST(event) {
  clearProxyToken(event);
  return json({ success: true });
}
