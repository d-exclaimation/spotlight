import { eq } from "drizzle-orm";
import type { IncomingHttpHeaders } from "http";
import { verify } from "../config/jwt.js";
import { db } from "../data/index.js";
import { users } from "../data/schema.js";

/**
 * Authenticate a user from the request headers.
 * @param headers The request headers.
 * @returns The user, if any.
 */
export async function auth(headers: IncomingHttpHeaders) {
  const token = headers.authorization?.split(" ").at(-1);
  if (!token) {
    return undefined;
  }
  const jwt = await verify<{ id: string }>(token);
  if (!jwt) {
    return undefined;
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, jwt.id),
  });
  return user;
}
