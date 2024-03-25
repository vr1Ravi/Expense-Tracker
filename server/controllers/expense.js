import { Expense } from "../models/expense_model.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, date, category, description } = req.body;

    // validation
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({
        message: "Invalid Inputs",
        success: false,
      });
    }

    if (amount <= 0 || typeof amount !== "number") {
      return res.status(400).json({
        message: "Amount must be greater than zero",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      date,
      category,
      description,
    });
    return res.status(201).json({
      message: "Expense added",
      success: true,
      expense,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expense = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Expense.findById(id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "No Expense Found",
      });
    }
    await Expense.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Expense deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
