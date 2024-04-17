import { User } from "../models/user_model.js";
import { createOTP, fast2SMS } from "../utils/otp.util.js";
import { creteToken } from "../utils/token.util.js";

export const registerUser = async (req, res) => {
  try {
    let { mobile } = req.body;
    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({
        mobile,
      });
    }

    // Crete OTP
    const otp = createOTP();
    user.phoneOTP = otp;
    await user.save();

    // send OTP
    await fast2SMS({
      message: `Your OTP is ${otp}`,
      contact_number: user.mobile,
    });

    return res.status(201).json({
      message: "Welcome account created OTP sended to mobile number",
      user_id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, user_id } = req.body;
    const user = await User.findById(user_id);

    if (otp !== user.phoneOTP) {
      return res.status(400).json({
        message: "Invalid otp",
      });
    }

    const token = creteToken({ _id: user._id });
    return res.json({
      message: "Welcome friend",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const ITEMS_PER_PAGE = 10;
export const getTransactions = async (req, res) => {
  const { page } = req.query;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    let user = req.user;

    user = await User.findById(user._id).populate({
      path: "transactions",
      options: { skip: skip, limit: ITEMS_PER_PAGE },
    });
    const itemsCount = user.transactions.length;
    const pageCount = Math.ceil(itemsCount / ITEMS_PER_PAGE) || 1;

    const transactions = user.transactions;
    const total_income = user.total_income;
    const total_expense = user.total_expense;

    return res.status(200).json({
      total_income,
      total_expense,
      transactions,
      pageCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res.cookie("token", null).json({
      message: "See you again",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
