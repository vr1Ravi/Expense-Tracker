import { Income } from "../models/income_model.js";
import Nodecache from "node-cache";
import { Transaction } from "../models/transaction_model.js";
import { User } from "../models/user_model.js";
// nodecache
const nodeCache = new Nodecache();

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
    let total_income;
    if (nodeCache.get("total_income")) {
      total_income = JSON.parse(nodeCache.get("total_income"));
    } else {
      total_income = 0;
    }

    total_income += income.amount;
    nodeCache.set("total_income", JSON.stringify(total_income));

    // Adding to transaction
    await Transaction.create({
      _id: income._id,
      title: income.title,
      amount: income.amount,
      date: income.date,
      description: income.description,
      type: "income",
    });

    return res.status(201).json({
      message: "Income added",
      success: true,
      income,
      total_income,
    });
  } catch (error) {
    console.log(error);
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
    const user = req.user;
    const itemsCountPromise = user.incomes.length;
    const incomesPromise = user.incomes
      .limit(ITEMS_PER_PAGE)
      .skip(skip)
      .sort({ createdAt: -1 });

    const [itemsCount, incomes] = await Promise.all([
      itemsCountPromise,
      incomesPromise,
    ]);

    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE) || 1;

    let total_income;

    if (nodeCache.has("total_income")) {
      total_income = JSON.parse(nodeCache.get("total_income"));
    } else {
      const totalIncomeAggregate = await Income.aggregate([
        {
          $group: {
            _id: null,
            totalIncome: { $sum: "$amount" },
          },
        },
      ]);

      total_income =
        totalIncomeAggregate.length > 0
          ? totalIncomeAggregate[0].totalIncome
          : 0;
      nodeCache.set("total_income", JSON.stringify(total_income));
    }

    return res.status(200).json({
      success: true,
      response: {
        pageCount,
        incomes,
        total_income,
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
    let total_income;
    if (nodeCache.get("total_income")) {
      total_income = JSON.parse(nodeCache.get("total_income"));
    } else {
      total_income = 0;
    }
    if (total_income) {
      total_income -= income.amount;
      nodeCache.set("total_income", JSON.stringify(total_income));
    }
    return res.status(200).json({
      success: true,
      message: "Income deleted",
      total_income,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
