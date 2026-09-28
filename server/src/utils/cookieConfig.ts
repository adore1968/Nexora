import { CookieOptions } from "express";

const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

export default cookieConfig;
