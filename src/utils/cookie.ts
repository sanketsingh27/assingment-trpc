import { serialize } from "cookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setCookie = ({ res, token }: { res: any; token: string }) => {
  res.setHeader("Set-Cookie", serialize("jwt", token, { path: "/" }), {
    httpOnly: true,
  });
};
