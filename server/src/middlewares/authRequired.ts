import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

const authRequired = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT_SECRET is not defined" });
  }

  try {
    const user = jwt.verify(token, jwtSecret) as JwtPayload;

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authRequired;
