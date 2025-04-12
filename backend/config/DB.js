import mongoose from 'mongoose';


const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/auth');
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit if DB connection fails
    }
  };
  
  export default connectDB;
  