import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "../data/index.js";
import { users } from "../data/schema.js";
import { procedure, router } from "./t.js";

export const app = router({
  trackViews: procedure
    .input(
      z.object({
        count: z.number().int().positive().optional().default(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        return { success: false };
      }

      const res = await db
        .update(users)
        .set({ glances: sql`${users.glances} + ${input.count}` })
        .where(eq(users.id, ctx.user.id))
        .returning();

      const updated = res.at(0);

      if (!updated) {
        return { success: false };
      }

      return { success: true };
    }),

  trackEngagement: procedure
    .input(
      z.object({
        category: z.union([z.literal("tech"), z.literal("politic")]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      new Error("Not implemented");
    }),
});
