import { Expense } from "../models/expense_model.js";
import { Transaction } from "../models/transaction_model.js";
import { User } from "../models/user_model.js";
export const addExpense = async (req, res) => {
  try {
    let { title, amount, date, description } = req.body;
    amount = Number(amount);
    const user = req.user;
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

    const expense = await Expense.create({
      title,
      amount,
      date,
      description,
    });

    await user.expenses.push(expense._id);

    user.total_expense = (user.total_expense ? user.total_expense : 0) + amount;

    await user.save();
    const transaction = await Transaction.create({
      _id: expense._id,
      title: expense.title,
      amount: expense.amount,
      date: expense.date,
      description: expense.description,
      category: "expense",
    });
    await user.transactions.push(transaction._id);
    await user.save();
    return res.status(201).json({
      message: "Expense added",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const ITEMS_PER_PAGE = 10;
export const getExpenses = async (req, res) => {
  try {
    const { page } = req.query;
    const start = (page - 1) * ITEMS_PER_PAGE;
    let user = req.user;
    const itemsCount = user.expenses.length;

    user = await User.findById(user._id).populate({
      path: "expenses",
      options: { skip: start, limit: ITEMS_PER_PAGE },
    });
    const total_expense = user.total_expense ? user.total_expense : 0;
    const expenses = user.expenses.slice(start, start + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE) || 1;

    return res.status(200).json({
      success: true,
      response: {
        pageCount,
        expenses,
        total_expense,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "No Expense Found",
      });
    }
    await Expense.deleteOne({ _id: id });
    await Transaction.deleteOne({ _id: id });

    const user = req.user;
    let index_of_expense = user.expenses.indexOf(
      (expense) => expense._id === id
    );
    user.expenses.splice(index_of_expense, 1);
    index_of_expense = user.transactions.indexOf(
      (transaction) => transaction._id === id
    );
    user.transactions.splice(index_of_expense, 1);

    user.total_expense = user.total_expense - expense.amount;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Expense deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
