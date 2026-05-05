import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';


dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


const connectDatabase = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is missing in your .env file');
    }

    await mongoose.connect(MONGO_URI);
    console.log('🍃 MongoDB Connected Successfully!');
    
  
    app.listen(PORT, () => {
      console.log(`🚀 Server running in dev mode on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Database connection failed:', (error as Error).message);
    process.exit(1); 
  }
};

connectDatabase();