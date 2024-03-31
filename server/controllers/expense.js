import NodeCache from "node-cache";
import { Expense } from "../models/expense_model.js";
import { Transaction } from "../models/transaction_model.js";
const nodeCache = new NodeCache();
export const addExpense = async (req, res) => {
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

    const expense = await Expense.create({
      title,
      amount,
      date,
      description,
    });
    let total_expense;
    if (nodeCache.get("total_expense")) {
      total_expense = JSON.parse(nodeCache.get("total_expense"));
    } else {
      total_expense = 0;
    }

    total_expense += amount;
    nodeCache.set("total_expense", total_expense);

    await Transaction.create({
      _id: income._id,
      title: income.title,
      amount: income.amount,
      date: income.date,
      description: income.description,
      type: "expense",
    });
    return res.status(201).json({
      message: "Expense added",
      success: true,
      expense,
      total_expense,
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
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const itemsCountPromise = Expense.estimatedDocumentCount({});

    const expensesPromise = Expense.find({})
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .sort({ createdAt: -1 });

    const [itemsCount, expenses] = await Promise.all([
      itemsCountPromise,
      expensesPromise,
    ]);
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE) || 1;

    let total_expense;

    if (nodeCache.get("total_expense")) {
      total_expense = JSON.parse(nodeCache.get("total_expense"));
    } else {
      const totalIncomeAggregate = await Expense.aggregate([
        {
          $group: {
            _id: null,
            totalExpense: { $sum: "$amount" },
          },
        },
      ]);

      total_expense =
        totalIncomeAggregate.length > 0
          ? totalIncomeAggregate[0].totalExpense
          : 0;
      nodeCache.set("total_expense", JSON.stringify(total_expense));
    }
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
    let total_expense;
    if (nodeCache.get("total_expense")) {
      total_expense = JSON.parse(nodeCache.get("total_expense"));
    } else {
      total_expense = 0;
    }
    if (total_expense) {
      total_expense -= expense.amount;
      nodeCache.set("total_expense", total_expense);
    }
    return res.status(200).json({
      success: true,
      total_expense,
      message: "Expense deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
