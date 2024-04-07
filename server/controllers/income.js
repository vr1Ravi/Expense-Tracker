import { Income } from "../models/income_model.js";
import { Transaction } from "../models/transaction_model.js";
import { User } from "../models/user_model.js";

export const addIncome = async (req, res) => {
  try {
    let { title, amount, date, description } = req.body;
    amount = Number(amount);

    // validation
    if (!title || !amount || !description || !date) {
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
      description,
    });
    const user = req.user;

    await user.incomes.push(income._id);
    user.total_income = (user.total_income ? user.total_income : 0) + amount;
    await user.save();

    // Adding to transaction
    const transaction = await Transaction.create({
      _id: income._id,
      title: income.title,
      amount: income.amount,
      date: income.date,
      description: income.description,
      category: "income",
    });
    await user.transactions.push(transaction._id);
    await user.save();
    return res.status(201).json({
      message: "Income added",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Items per Page
const ITEMS_PER_PAGE = 10;
export const getIncomes = async (req, res) => {
  try {
    const { page } = req.query;
    const start = (page - 1) * ITEMS_PER_PAGE;
    let user = req.user;
    const itemsCount = user.incomes.length;
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE) || 1;

    user = await User.findById(user._id).populate({
      path: "incomes",
      options: { skip: start, limit: ITEMS_PER_PAGE },
    });

    const incomes = user.incomes.slice(start, start + ITEMS_PER_PAGE);
    const total_income = user.total_income || 0;
    return res.status(200).json({
      success: true,
      response: {
        pageCount,
        incomes,
        total_income,
      },
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
    await Transaction.deleteOne({ _id: id });

    const user = req.user;
    const index_of_income = user.incomes.indexOf((income) => income._id === id);
    user.incomes.splice(index_of_income, 1);
    user.total_income = user.total_income - income.amount;
    await user.save();

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
