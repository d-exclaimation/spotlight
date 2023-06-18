import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { z } from "zod";
import { sign } from "../config/jwt.js";
import { consola, now } from "../config/log.js";
import { db } from "../data/index.js";
import { codes, users, waitlist } from "../data/schema.js";
import { mail } from "../email/index.js";
import { markup } from "../email/markup.js";
import { hoursSince, minutesSince } from "../lib/time.js";
import { procedure, router } from "./t.js";

export const app = router({
  me: procedure.query(async ({ ctx }) => {
    return { user: ctx.user };
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

      if (existing) {
        return { token: null };
      }

      const rows = await db
        .insert(waitlist)
        .values({
          email: input.email,
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
