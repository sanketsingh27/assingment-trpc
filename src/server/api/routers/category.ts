import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  fetchCategories: publicProcedure
    .input(
      z.object({
        pageNo: z.number().min(1).default(1),
        take: z.number().min(1).max(100).default(6), //
      }),
    )
    .query(async ({ ctx, input }) => {
      const { pageNo, take } = input;
      const categories = await ctx.db.category.findMany({
        skip: (pageNo - 1) * take,
        take,
      });
      return categories;
    }),
});
