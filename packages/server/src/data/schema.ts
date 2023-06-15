import { relations } from "drizzle-orm";
import {
  char,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const waitlist = pgTable(
  "wailist",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    note: text("note").default(""),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
  })
);

export const codes = pgTable(
  "codes",
  {
    code: char("code", { length: 8 }).notNull().primaryKey(),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userCodeIdx: uniqueIndex("user_code_idx").on(table.userId, table.code),
  })
);

export const codesRelations = relations(codes, ({ one }) => ({
  user: one(users, { fields: [codes.userId], references: [users.id] }),
}));
