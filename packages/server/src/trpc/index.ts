import { and, eq } from "drizzle-orm";
import { ulid } from "ulid";
import { z } from "zod";
import { sign, verify } from "../config/jwt.js";
import { db } from "../data/index.js";
import { codes, users, waitlist } from "../data/schema.js";
import { mail } from "../email/index.js";
import { loginMarkup } from "../email/markup.js";
import { procedure, router } from "./t.js";

export const app = router({
  waitlist: procedure.query(async () => {
    const list = await db.query.waitlist.findMany({
      columns: {
        id: true,
        email: true,
        note: true,
      },
    });

    return list;
  }),

  me: procedure.query(async ({ ctx }) => {
    const token = ctx.headers.authorization?.split(" ").at(-1);
    if (!token) {
      return { user: undefined };
    }
    const jwt = await verify<{ id: string }>(token);
    if (!jwt) {
      return { user: undefined };
    }
    const user = await db.query.users.findFirst({
      where: eq(users.id, jwt.id),
    });
    return { user };
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
        return { user: false };
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
        await tx.insert(codes).values({ code, userId: user.id }).execute();
      });

      await mail({
        to: user.email,
        subject: "Spotlight Login",
        html: loginMarkup(code),
      });

      return { user };
    }),

  login2: procedure
    .input(
      z.object({
        id: z.string().uuid(),
        code: z.string().length(8),
      })
    )
    .mutation(async ({ input }) => {
      const code = await db.query.codes.findFirst({
        where: and(eq(codes.code, input.code), eq(codes.userId, input.id)),
        with: { user: true },
      });

      if (!code) {
        return { user: undefined };
      }

      await db.delete(codes).where(eq(codes.userId, code.userId)).execute();

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
      const rows = await db
        .insert(waitlist)
        .values({
          email: input.email,
        })
        .returning();
      const token = await sign({ id: rows[0].id });
      return {
        token,
      };
    }),
});

export type App = typeof app;
