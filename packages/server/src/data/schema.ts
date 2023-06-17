import { relations } from "drizzle-orm";
import {
  char,
  pgTable,
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
    email: text("email").notNull(),
    note: text("note").default(""),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
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
 * Relation between one-time codes and users for login.
 */
export const codesRelations = relations(codes, ({ one }) => ({
  user: one(users, { fields: [codes.userId], references: [users.id] }),
}));
