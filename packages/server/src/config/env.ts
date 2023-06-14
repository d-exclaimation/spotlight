import { z } from "zod";

export type Env = z.infer<typeof Env>;
export const Env = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  JWT_SECRET: z
    .string()
    .transform((secret) => new TextEncoder().encode(secret)),
});

export const env = Env.parse(process.env);