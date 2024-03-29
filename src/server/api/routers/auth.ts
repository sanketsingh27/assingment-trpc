import { z } from "zod";
import { hashPassword, comparePasswords, generateToken } from "~/utils/auth";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const hashedPassword = await hashPassword(password);

      const user = await ctx.db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return user;
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const user = await ctx.db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await comparePasswords(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken({ userId: user.id });

      return {
        ...user,
        token,
        password: "**************",
      };
    }),
});
