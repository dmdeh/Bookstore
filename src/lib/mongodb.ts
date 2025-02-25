import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
};
