import { serialize } from "cookie";

export const setCookie = ({ res, token }) => {
  res.setHeader("Set-Cookie", serialize("jwt", token, { path: "/" }), {
    httpOnly: true,
  });
};
