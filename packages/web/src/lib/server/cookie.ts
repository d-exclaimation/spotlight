import type { RequestEvent } from "@sveltejs/kit";

export function setProxyToken<T extends RequestEvent<any, any>>(
  event: T,
  value: string
) {
  event.cookies.set("proxy-token", value);
}

export function getProxyToken<T extends RequestEvent<any, any>>(event: T) {
  return event.cookies.get("proxy-token");
}

export function clearProxyToken<T extends RequestEvent<any, any>>(event: T) {
  event.cookies.delete("proxy-token");
}
