import { setServers } from "node:dns/promises";
import mongoose from "mongoose";

setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(MONGO_URI);

    console.log("DB is connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
