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
    console.log(user);
    // send OTP
    await fast2SMS({
      message: `Your OTP is ${otp}`,
      contact_number: user.mobile,
    });

    return res.status(201).json({
      message: "Welcom account created OTP sended to mobile number",
      user_id: user._id,
    });
  } catch (error) {
    console.log(error);
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
    return res
      .cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      })
      .json({
        message: "Welcome friend",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // const
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
