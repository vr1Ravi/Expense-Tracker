import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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
    required: true,
  },

  date: {
    type: String,
    requireds: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxLegth: 20,
    trim: true,
  },
});

export const Transaction = mongoose.model("Transaction", TransactionSchema);
