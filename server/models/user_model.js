import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
});

export const User = mongoose.model("User", userSchema);
