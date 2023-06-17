import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config/env.js";
import * as schema from "./schema.js";

/**
 * The database client.
 */
export const client = postgres(env.DATABASE_URL);

/**
 * The drizzle orm type-safe database layer.
 */
export const db = drizzle(client, { schema });
