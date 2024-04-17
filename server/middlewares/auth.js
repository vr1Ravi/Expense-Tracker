import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/token.util.js";
import { User } from "../models/user_model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Login first",
      });
    }
    const decoded = await verifyToken(token);

    if (!decoded) {
      return res.status(400).json({
        message: "Token verification failed",
      });
    }
    req.user = await User.findById(decoded);
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
