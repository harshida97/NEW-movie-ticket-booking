import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Always first before using process.env

let isConnected = false; // Track connection globally

export const connect = async () => {
  if (isConnected) {
    console.log("=> Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("=> New MongoDB connection created");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
