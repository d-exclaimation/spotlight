import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./data/index.js";

await migrate(db, { migrationsFolder: "./migrations" });
