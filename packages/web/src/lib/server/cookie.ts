import type { RequestEvent } from "@sveltejs/kit";

export function setProxyToken<T extends RequestEvent<any, any>>(
  event: T,
  value: string
) {
  event.cookies.set("proxy-token", value, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
  });
}

export function getProxyToken<T extends RequestEvent<any, any>>(event: T) {
  return event.cookies.get("proxy-token");
}

export function clearProxyToken<T extends RequestEvent<any, any>>(event: T) {
  event.cookies.delete("proxy-token");
}
