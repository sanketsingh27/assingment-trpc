import { getUserFromDatabase } from "~/utils/db";
import { parse } from "cookie";

import { TRPCError, initTRPC } from "@trpc/server";
import {
  type NextApiRequest,
  type CreateNextContextOptions,
} from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { verifyToken } from "~/utils/auth";

type CreateContextOptions = Record<string, never>;

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

const isAuthenticated = async (req: NextApiRequest) => {
  const cookies = parse(req?.headers?.cookie ?? "");
  const token = cookies.jwt;

  if (!token) {
    return null;
  }
  const decoded = verifyToken(token);
  let user;

  if (decoded && typeof decoded === "object" && "userId" in decoded) {
    user = await getUserFromDatabase(decoded.userId);
  }
  return user;
};

export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;
  const user = await isAuthenticated(req);

  return {
    ...createInnerTRPCContext({}),
    user,
    req,
    res,
  };
};

export const publicProcedure = t.procedure;

// Defining Protected Procedure
const isAuthenticatedMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not authorized ",
    });
  }
  return next();
});

export const protectedProcedure = t.procedure.use(isAuthenticatedMiddleware);
