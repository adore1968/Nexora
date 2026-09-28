import jwt from "jsonwebtoken";
import type { Types } from "mongoose";

interface JwtPayload {
  id: Types.ObjectId;
}

export const createAccessToken = (payload: JwtPayload): Promise<string> => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        reject(err);
        return;
      }

      if (!token) {
        reject(new Error("Token was not genereted"));
        return;
      }

      resolve(token);
    });
  });
};
