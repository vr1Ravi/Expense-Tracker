import { Income } from "../models/income_model.js";

export const addIncome = async (req, res) => {
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

    const income = await Income.create({
      title,
      amount,
      date,
      category,
      description,
    });
    return res.status(201).json({
      message: "Income added",
      success: true,
      income,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      incomes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "No Income Found",
      });
    }
    await Income.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Income deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
