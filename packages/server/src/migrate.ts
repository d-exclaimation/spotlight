import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./data/index.js";

// Run the migrations
await migrate(db, { migrationsFolder: "./migrations" });
console.log("Migrations complete");
process.exit(0);
