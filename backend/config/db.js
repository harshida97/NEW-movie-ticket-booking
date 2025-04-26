import dotenv from 'dotenv';
import mongoose from "mongoose";

console.log(process.env.DB_URL);
dotenv.config();

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongodb successfully connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};