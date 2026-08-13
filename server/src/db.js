import { setServers } from "node:dns/promises";
import mongoose from "mongoose";

setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB is connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
