import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to mongoDB successfully`);
  } catch (error) {
    console.log(`Error to connect to mongoDB`);
  }
};

export default connectDB;
