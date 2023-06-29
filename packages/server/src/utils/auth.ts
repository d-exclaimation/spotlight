import { eq, type InferModel } from "drizzle-orm";
import type {
  IncomingHttpHeaders,
  IncomingMessage,
  ServerResponse,
} from "http";
import { env } from "../config/env.js";
import { verify } from "../config/jwt.js";
import { db } from "../data/index.js";
import { users } from "../data/schema.js";

/**
 * The different kinds of authenticated users.
 */
export type AuthUser =
  | { kind: "guest" }
  | ({ kind: "user" } & InferModel<typeof users>)
  | ({ kind: "proxy" } & InferModel<typeof users>)
  | { kind: "direct" };

/**
 * Authenticate a user from the request headers.
 * @param headers The request headers.
 * @returns The user, if any.
 */
export async function auth(headers: IncomingHttpHeaders): Promise<AuthUser> {
  const [kind, token] = headers.authorization?.split(" ") ?? [];
  if (kind === "Key" && token === env.PRIVATE_API_KEY) {
    return { kind: "direct" };
  }

  if (!token) {
    return { kind: "guest" };
  }

  const jwt = await verify<{ id: string }>(token);
  if (!jwt) {
    return { kind: "guest" };
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, jwt.id),
  });
  if (!user) {
    return { kind: "guest" };
  }
  return {
    kind: kind === "Bearer" ? "user" : "proxy",
    ...user,
  };
}

/**
 * Set the query-only cookie token.
 * @param res The server response.
 * @param param1 The cookie options.
 */
export function setQueryToken(
  res: ServerResponse<IncomingMessage>,
  value: string
) {
  setCookie(res, {
    name: "proxy-token",
    value,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
}

type CookieOptions = {
  /**
   * The cookie name.
   */
  name: string;

  /**
   * The cookie value.
   */
  value: string;

  /**
   * The cookie domain.
   */
  domain?: string;

  /**
   * The cookie path.
   */
  path?: string;

  /**
   * The cookie expires.
   */
  expires?: Date;

  /**
   * The cookie max age.
   */
  maxAge?: number;

  /**
   * The cookie http only.
   */
  httpOnly?: boolean;

  /**
   * The cookie secure.
   */
  secure?: boolean;

  /**
   * The cookie same site.
   */
  sameSite?: "strict" | "lax" | "none";
};

/**
 * Helper to set a cookie.
 * @param res The server response.
 * @param param1 The cookie options.
 */
export function setCookie(
  res: ServerResponse<IncomingMessage>,
  { name, value, ...rest }: CookieOptions
) {
  const configs = [] as string[];
  if (rest.domain) {
    configs.push(`Domain=${rest.domain}`);
  }
  if (rest.path) {
    configs.push(`Path=${rest.path}`);
  }
  if (rest.expires) {
    configs.push(`Expires=${rest.expires.toUTCString()}`);
  }
  if (rest.maxAge) {
    configs.push(`Max-Age=${rest.maxAge}`);
  }
  if (rest.httpOnly) {
    configs.push(`HttpOnly`);
  }
  if (rest.secure) {
    configs.push(`Secure`);
  }
  if (rest.sameSite) {
    configs.push(`SameSite=${rest.sameSite}`);
  }
  const cookie = `${name}=${value}${
    configs.length ? `; ${configs.join("; ")}` : ""
  }`;

  res.setHeader("Set-Cookie", cookie);
}
