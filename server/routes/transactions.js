import { Router } from "express";
import { addIncome, deleteIncome, getIncomes } from "../controllers/income.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expense.js";
import { registerUser, verifyOTP } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

// Income
router.route("/add-income").post(isAuthenticated, addIncome);
router.route("/get-incomes").get(isAuthenticated, getIncomes);
router.route("/delete-income/:id").delete(isAuthenticated, deleteIncome);

// Expense
router.route("/add-expense").post(isAuthenticated, addExpense);
router.route("/get-expenses").get(isAuthenticated, getExpenses);
router.route("/delete-expense/:id").delete(isAuthenticated, deleteExpense);

// user
router.route("/register-or-login").post(registerUser);
router.route("/verify-otp").post(verifyOTP);

export { router };
