import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserType } from "../models/user.model.js";
import { Request, Response } from "express";
import { RegisterBody, LoginBody } from "../schemas/auth.schema.js";
import { createAccessToken } from "../libs/jwt.js";
import cookieConfig from "../utils/cookieConfig.js";

interface JwtPayload {
  id: string;
}

const userResponse = (user: UserType) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
  try {
    const { username, email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(409).json([
        {
          field: "email",
          error: "The email already exists",
        },
      ]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, cookieConfig);

    return res.json(userResponse(userSaved));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(401).json([
        {
          field: "email",
          error: "Invalid credentials",
        },
      ]);
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json([
        {
          field: "password",
          error: "Invalid credentials",
        },
      ]);
    }

    const token = await createAccessToken({
      id: userFound._id,
    });

    res.cookie("token", token, cookieConfig);

    return res.json(userResponse(userFound));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { ...cookieConfig, expires: new Date(0) });

    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT_SECRET is not defined" });
    }

    const user = jwt.verify(token, jwtSecret) as JwtPayload;

    const userFound = await User.findById(user.id);

    if (!userFound) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
