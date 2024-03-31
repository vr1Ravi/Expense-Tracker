import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLegth: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLegth: 20,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLegth: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Income = mongoose.model("Income", IncomeSchema);
