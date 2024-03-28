import jwt from "jsonwebtoken";

export const creteToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const verifyToken = (token) => {
  try {
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET);
    return user_id;
  } catch (error) {
    return null;
  }
};