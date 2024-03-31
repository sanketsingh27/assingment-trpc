import { z } from "zod";
import { hashPassword, comparePasswords, generateToken } from "~/utils/auth";

import { setCookie } from "~/utils/cookie";
import { sendLoginEmail } from "~/server/mailer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  requestOtp: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      //send email
      const { email } = input;
      try {
        await sendLoginEmail({
          email,
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "unable to send email",
        });
      }
      return true;
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        otp: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name, otp } = input;
      const { res } = ctx;

      if (otp !== "123456") {
        throw new Error("Wrong OTP");
      }
      const hashedPassword = await hashPassword(password);

      const user = await ctx.db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const token = generateToken({ userId: user.id });

      setCookie({ res, token });

      return {
        ...user,
        token,
        password: "**************",
      };
    }),
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const { res } = ctx;

      const user = await ctx.db.user.findUnique({
        where: {
          email: email,
        },
        include: {
          selectedCategories: {
            include: {
              category: true,
            },
          },
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
      setCookie({ res, token });
      return {
        ...user,
        token,
        password: "**************",
      };
    }),
});
