import { z } from "zod";

/**
 * The type of expected environment variables.
 */
export type Env = z.infer<typeof Env>;
export const Env = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  JWT_SECRET: z
    .string()
    .transform((secret) => new TextEncoder().encode(secret)),
  EMAIL_KEY: z.string(),
  EMAIL_ADDRESS: z.string().catch("onboarding@resend.dev"),
});

/**
 * Fully type-safe environment variables.
 */
export const env = Env.parse(process.env);
