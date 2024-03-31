import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/token.util.js";
import { User } from "../models/user_model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        message: "Login first",
      });
    }
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        message: "Token verification failed",
      });
    }
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
