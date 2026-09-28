import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userFound.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default isAdmin;
