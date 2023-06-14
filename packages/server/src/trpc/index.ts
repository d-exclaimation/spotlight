import { eq } from "drizzle-orm";
import { z } from "zod";
import { sign, verify } from "../config/jwt.js";
import { db } from "../data/index.js";
import { users, waitlist } from "../data/schema.js";
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
