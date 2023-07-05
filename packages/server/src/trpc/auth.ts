import { and, eq, sql } from "drizzle-orm";
import { ulid } from "ulid";
import { z } from "zod";
import { sign } from "../config/jwt.js";
import { consola, now } from "../config/log.js";
import { db } from "../data/index.js";
import { codes, users, waitlist } from "../data/schema.js";
import { mail } from "../email/index.js";
import { markup } from "../email/markup.js";
import { hoursSince, minutesSince } from "../utils/time.js";
import { procedure, router } from "./t.js";

export const app = router({
  me: procedure.query(async ({ ctx }) => {
    if (ctx.auth.kind !== "user") {
      return { user: null };
    }
    const { kind, ...user } = ctx.auth;
    return { user };
  }),

  edit: procedure
    .input(
      z.object({
        username: z.string().min(3).max(32),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.auth.kind !== "user") {
        return { user: null };
      }
      const [res] = await db
        .update(users)
        .set({ username: input.username })
        .where(eq(users.id, ctx.auth.id))
        .returning();

      if (!res) {
        return { user: null };
      }

      return { user: res };
    }),

  login: procedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email),
        columns: { email: true, id: true },
      });
      if (!user) {
        return { user: null };
      }

      const existingCode = await db.query.codes.findFirst({
        where: eq(codes.userId, user.id),
      });

      if (existingCode && minutesSince(existingCode.createdAt) < 5) {
        return { user };
      }

      let code = ulid().slice(0, 8);
      while (true) {
        const existing = await db.query.codes.findFirst({
          where: eq(codes.code, code),
        });
        if (!existing) {
          break;
        }
        code = ulid().slice(0, 8);
      }

      await db.transaction(async (tx) => {
        await tx.delete(codes).where(eq(codes.userId, user.id)).execute();
        await tx
          .insert(codes)
          .values({ code, userId: user.id, createdAt: new Date() })
          .execute();
      });

      await mail({
        to: user.email,
        subject: "Spotlight Login",
        html: markup.login(code),
      });

      consola.info(`[${now()}] 📧 Sent login code to ${user.email}`);

      return { user };
    }),

  login2: procedure
    .input(
      z.object({
        code: z.string().length(8),
      })
    )
    .mutation(async ({ input }) => {
      const code = await db.query.codes.findFirst({
        where: eq(codes.code, input.code),
        with: { user: true },
      });

      if (!code) {
        return { user: null, token: null };
      }

      await db.delete(codes).where(eq(codes.userId, code.userId)).execute();

      if (hoursSince(code.createdAt) >= 2) {
        return { user: null, token: null };
      }

      const token = await sign({ id: code.user.id });

      return { user: code.user, token };
    }),

  refresh: procedure.mutation(async ({ ctx }) => {
    if (ctx.auth.kind !== "user") {
      return { token: null };
    }

    const { kind, ...user } = ctx.auth;

    const token = await sign({ id: ctx.auth.id });

    return { user, token };
  }),

  signup: procedure
    .input(
      z.object({
        username: z.string().min(3).max(32),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      const waiting = await db.query.waitlist.findFirst({
        where: eq(waitlist.email, input.email),
      });

      if (existing) {
        return { success: false };
      }

      if (waiting && waiting.retries >= 3) {
        return { success: false };
      }

      if (waiting) {
        await db
          .update(waitlist)
          .set({ retries: sql`${waiting.retries} + 1` })
          .where(eq(waitlist.email, input.email))
          .execute();

        await mail({
          to: input.email,
          subject: "Welcome to Spotlight!",
          html: markup.welcome(waiting.email, waiting.code),
        });

        return { success: true };
      }

      const [res] = await db
        .insert(waitlist)
        .values({
          username: input.username,
          email: input.email,
          code: ulid().slice(0, 8),
          createdAt: new Date(),
        })
        .returning();

      await mail({
        to: input.email,
        subject: "Welcome to Spotlight!",
        html: markup.welcome(res.email, res.code),
      });

      consola.info(`[${now()}]  🚏 Sent welcome code to ${input.email}`);

      return { success: true };
    }),

  signup2: procedure
    .input(
      z.object({
        email: z.string().email(),
        code: z.string().length(8),
      })
    )
    .mutation(async ({ input }) => {
      const waiting = await db.query.waitlist.findFirst({
        where: and(
          eq(waitlist.email, input.email),
          eq(waitlist.code, input.code)
        ),
      });

      if (!waiting) {
        return { token: null };
      }

      await db.delete(waitlist).where(eq(waitlist.id, waiting.id)).execute();
      if (hoursSince(waiting.createdAt) >= 2) {
        return { token: null };
      }

      const [user] = await db
        .insert(users)
        .values({
          email: waiting.email,
          username: waiting.username,
          createdAt: new Date(),
        })
        .returning();

      const token = await sign({ id: user.id });

      return { token };
    }),

  preregister: procedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      const waiting = await db.query.waitlist.findFirst({
        where: eq(waitlist.email, input.email),
      });

      if (existing || waiting) {
        return { token: null };
      }

      const rows = await db
        .insert(waitlist)
        .values({
          username: input.email.split("@")[0],
          email: input.email,
          code: ulid().slice(0, 6),
          createdAt: new Date(),
        })
        .returning();

      const token = await sign({ id: rows[0].id });

      consola.info(`[${now()}] 🚏 ${input.email} joined the wailist`);

      return {
        token,
      };
    }),
});
