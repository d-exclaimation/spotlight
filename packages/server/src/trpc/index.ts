import { z } from "zod";
import { sign } from "../config/jwt.js";
import { db } from "../data/index.js";
import { waitlist } from "../data/schema.js";
import { procedure, router } from "./t.js";

export const app = router({
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
