import jwt from "jsonwebtoken";

export const creteToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 7 * 24 * 60 * 60 * 1000,
  });
};

export const verifyToken = (token) => {
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    return _id;
  } catch (error) {
    return null;
  }
};
