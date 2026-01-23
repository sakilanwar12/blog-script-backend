import { Request, Response, NextFunction } from "express";
import { envVariables } from "../../config";
import { verifyToken } from "../../lib/generateToken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
 
 const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const secret = envVariables.JWT_ACCESS_TOKEN;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = verifyToken(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
