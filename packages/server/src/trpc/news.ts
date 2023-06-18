import { z } from "zod";
import * as source1 from "../aggregate/source-1.js";
import { procedure, router } from "./t.js";

export const app = router({
  curation: procedure
    .input(
      z.object({
        page: z.number().int().positive().optional().default(1),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.user) {
        return { news: [], page: input.page };
      }

      return await source1.collect({ sort: "news", page: input.page });
    }),

  newest: procedure
    .input(
      z.object({
        page: z.number().int().positive().optional().default(1),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.user) {
        return { news: [], page: input.page };
      }

      return await source1.collect({ sort: "newest", page: input.page });
    }),
});
