import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error occurred while connecting DB:", error);
    process.exit(1); 
  }
};

export default connectDB;
