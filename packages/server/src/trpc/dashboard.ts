import { and, desc, eq, not, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "../data/index.js";
import { preferences, statistics } from "../data/schema.js";
import { Category, categories } from "../utils/category.js";
import { procedure, router } from "./t.js";

export const app = router({
  dashboard: procedure.query(async ({ ctx }) => {
    if (ctx.auth.kind !== "user") {
      return { user: null };
    }

    const [{ total: totalEngagements }] = await db
      .select({
        total: sql<number>`sum(${statistics.engagements})`,
      })
      .from(preferences)
      .where(eq(preferences.userId, ctx.auth.id));

    const recentEngagements = await db.query.statistics.findMany({
      where: eq(statistics.userId, ctx.auth.id),
      orderBy: [desc(statistics.date)],
      limit: 10,
    });

    const topPreferences = await db.query.preferences.findMany({
      where: and(
        eq(preferences.userId, ctx.auth.id),
        not(eq(preferences.category, categories.uncategorized))
      ),
      orderBy: [desc(preferences.engagements)],
      limit: 5,
    });

    const emptyCategories = Object.values(categories)
      .filter(
        (category) => !topPreferences.some((pref) => pref.category === category)
      )
      .map((category) => ({
        category,
        engagements: 0,
      }));

    return {
      user: {
        id: ctx.auth.id,
        username: ctx.auth.username,
        email: ctx.auth.email,
        engagements: totalEngagements ?? 0,
        activities: recentEngagements
          .map(({ date, engagements }) => ({
            date,
            engagements,
          }))
          .reverse(),
        topCategories: [
          ...topPreferences.map(({ category, engagements }) => ({
            category,
            engagements,
          })),
          ...emptyCategories.slice(0, 5 - topPreferences.length),
        ],
      },
    };
  }),

  trackEngagement: procedure
    .input(
      z.object({
        category: Category.optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.auth.kind !== "user") {
        return { success: false };
      }

      const userId = ctx.auth.id;
      const category = input.category ?? categories.uncategorized;

      return await db.transaction(async (tx) => {
        const [stat] = await tx
          .insert(statistics)
          .values({
            date: new Date(),
            userId: userId,
            engagements: 1,
          })
          .onConflictDoUpdate({
            target: [statistics.userId, statistics.date],
            set: {
              engagements: sql`${statistics.engagements} + 1`,
            },
          })
          .returning();

        const [pref] = await tx
          .insert(preferences)
          .values({
            category: category,
            userId: userId,
            engagements: 1,
          })
          .onConflictDoUpdate({
            target: [preferences.userId, preferences.category],
            set: {
              engagements: sql`${preferences.engagements} + 1`,
            },
          })
          .returning();

        return { success: !!stat && !!pref };
      });
    }),

  clearData: procedure.mutation(async ({ ctx }) => {
    if (ctx.auth.kind !== "user") {
      return { success: false };
    }

    const userId = ctx.auth.id;

    return await db.transaction(async (tx) => {
      await tx.delete(statistics).where(eq(statistics.userId, userId));
      await tx.delete(preferences).where(eq(preferences.userId, userId));

      return { success: true };
    });
  }),
});
