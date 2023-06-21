import { eq, type InferModel } from "drizzle-orm";
import type { IncomingHttpHeaders } from "http";
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
    kind: "user",
    ...user,
  };
}
