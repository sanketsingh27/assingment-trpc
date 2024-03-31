import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: object) => {
  return sign(payload, process.env.SECRET_KEY!, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, process.env.SECRET_KEY!);
    return decoded;
  } catch (err) {
    return null;
  }
};
