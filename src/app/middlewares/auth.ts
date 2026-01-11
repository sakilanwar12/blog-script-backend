import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { envVariables } from "../../config";
import User from "../modules/user/user.model";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      envVariables.JWT_SECRET
    ) as { userId: string; role: string };

    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.user = {
      userId: user._id.toString(),
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
