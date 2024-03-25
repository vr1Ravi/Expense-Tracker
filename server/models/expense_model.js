import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
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
    type: {
      type: String,
      default: "Expense",
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
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

export const Expense = mongoose.model("Expense", ExpenseSchema);
