import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};