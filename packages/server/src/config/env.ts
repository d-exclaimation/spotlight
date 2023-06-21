import { z } from "zod";

/**
 * The type of expected environment variables.
 */
export type Env = z.infer<typeof Env>;
export const Env = z.object({
  // Node.js configuration
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  // Database configuration
  DATABASE_URL: z.string(),

  // Authentication configuration
  JWT_SECRET: z
    .string()
    .transform((secret) => new TextEncoder().encode(secret)),
  PRIVATE_API_KEY: z.string(),

  // Email configuration
  EMAIL_KEY: z.string(),
  EMAIL_ADDRESS: z.string().catch("onboarding@resend.dev"),

  // News source configuration
  NEWS_SOURCE_1: z.string(),
  NEWS_REDIRECT_1: z.string(),
});

/**
 * Fully type-safe environment variables.
 */
export const env = Env.parse(process.env);
