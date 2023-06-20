import { z } from "zod";
import { procedure, router } from "./t.js";

export const app = router({
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
