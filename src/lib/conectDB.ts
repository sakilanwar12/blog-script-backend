
import mongoose from "mongoose";
import { envVariables } from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(envVariables.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;