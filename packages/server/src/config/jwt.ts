import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "./env.js";

const JWT_ALG = "HS256";
const ISSUER = "spotlight:server:node";
const AUDIENCE = {
  WEB: "spotlight:client:web",
};

/**
 * Sign a JWT payload
 * @param payload JWT payload
 * @returns Signed JWT
 */
export async function sign<T extends JWTPayload>(payload: T) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE.WEB)
    .setExpirationTime("21d")
    .sign(env.JWT_SECRET);
}

/**
 * Verify and parse payload from JWT token
 * @param token Signed JWT token
 * @returns Verified payload if any
 */
export async function verify<T extends JWTPayload>(token: string) {
  try {
    const { payload } = await jwtVerify(token, env.JWT_SECRET, {
      audience: AUDIENCE.WEB,
      issuer: ISSUER,
      algorithms: [JWT_ALG],
    });

    return payload as T;
  } catch {
    return null;
  }
}
