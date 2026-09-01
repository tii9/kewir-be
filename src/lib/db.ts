import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in the .env file.');

    await mongoose.connect(uri);
    console.log('🟢 Successfully connected to MongoDB using Mongoose!');
  } catch (error) {
    console.error('🔴 Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};