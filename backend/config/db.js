import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connect = async () => {
  if (isConnected) {
    console.log('=> Using existing MongoDB connection');
    return;
  }

  if (!process.env.DB_URL) {
    throw new Error('MongoDB connection string (DB_URL) is missing');
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState;
    console.log('=> New MongoDB connection created');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
