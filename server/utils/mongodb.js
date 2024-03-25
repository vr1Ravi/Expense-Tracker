import mongoose from "mongoose";

export const connectMongoDb = async () => {
  return await mongoose.connect(process.env.MONGO_URL);
};
