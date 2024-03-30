import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getFavoriteCategory: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          selectedCategories: true,
        },
      });

      if (!user) {
        throw new Error("User doesn't Exists");
      }

      const selectedCategories = user.selectedCategories.length
        ? user.selectedCategories.map(({ categoryId }) => categoryId)
        : [];

      return selectedCategories;
    }),

  addFavoriteCategory: publicProcedure
    .input(z.object({ userId: z.string(), categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId } = input;

      const newAssociation = await ctx.db.userCategory.create({
        data: {
          userId,
          categoryId,
        },
      });

      return newAssociation;
    }),

  removeFavoriteCategory: publicProcedure
    .input(z.object({ userId: z.string(), categoryId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId } = input;

      // Remove the association
      const removedAssociation = await ctx.db.userCategory.delete({
        where: {
          userId_categoryId: {
            userId,
            categoryId,
          },
        },
      });

      return removedAssociation;
    }),
});
