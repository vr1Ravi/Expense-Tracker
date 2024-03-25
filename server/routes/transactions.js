import { Router } from "express";
import { addIncome, deleteIncome, getIncomes } from "../controllers/income.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expense.js";

const router = Router();

router.route("/add-income").post(addIncome);
router.route("/get-incomes").get(getIncomes);
router.route("/delete-income/:id").delete(deleteIncome);

router.route("/add-expense").post(addExpense);
router.route("/get-expenses").get(getExpenses);
router.route("/delete-expense/:id").delete(deleteExpense);

export { router };
