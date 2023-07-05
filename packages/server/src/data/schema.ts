import { relations } from "drizzle-orm";
import {
  char,
  date,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * The waitlist table.
 */
export const waitlist = pgTable(
  "wailist",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    code: char("code", { length: 8 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
    retries: integer("retries").notNull().default(0),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

/**
 * The users table.
 */
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

/**
 * The 8 digit one-time codes table.
 */
export const codes = pgTable(
  "codes",
  {
    code: char("code", { length: 8 }).notNull().primaryKey(),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userCodeIdx: uniqueIndex("user_code_idx").on(table.userId, table.code),
  })
);

/**
 * The preferences table for each person to news category.
 */
export const preferences = pgTable(
  "preferences",
  {
    userId: uuid("user_id").notNull(),
    category: text("category").notNull(),
    engagements: integer("engagements").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.category),
  })
);

export const statistics = pgTable(
  "statistics",
  {
    userId: uuid("user_id").notNull(),
    date: date("date", { mode: "date" }).notNull(),
    engagements: integer("engagements").notNull().default(0),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.date),
  })
);

/**
 * Relation between one-time codes and users for login.
 */
export const codesRelations = relations(codes, ({ one }) => ({
  user: one(users, { fields: [codes.userId], references: [users.id] }),
}));

/**
 * Relation between preferences and users for news category preferences.
 */
export const preferencesRelations = relations(preferences, ({ one }) => ({
  user: one(users, { fields: [preferences.userId], references: [users.id] }),
}));

/**
 * Relation between statistics and users for news daily engagements.
 */
export const statisticsRelations = relations(statistics, ({ one }) => ({
  user: one(users, { fields: [statistics.userId], references: [users.id] }),
}));

/**
 * Relation between users and preferences for news category preferences.
 */
export const usersRelations = relations(users, ({ many }) => ({
  preferences: many(preferences),
}));

/**
 * Relation between users and statistics for news daily engagements.
 */
export const usersStatisticsRelations = relations(users, ({ many }) => ({
  statistics: many(statistics),
}));
