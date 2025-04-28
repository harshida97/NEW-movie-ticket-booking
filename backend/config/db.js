import mongoose from "mongoose";

let isConnected = false; // Track connection globally

export const connect = async () => {
  if (isConnected) {
    console.log("=> Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL);

    isConnected = db.connections[0].readyState === 1;
    console.log("=> New MongoDB connection created");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
