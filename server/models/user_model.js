import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  phoneOTP: String,
});

export const User = mongoose.model("User", userSchema);
