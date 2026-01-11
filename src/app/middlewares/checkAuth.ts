import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth";
import sendResponse from "../../lib/sendResponse";

export const checkAuth =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(res, {
        success: false,
        data: null,
        message: "Unauthorized user",
        statusCode: 401,
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendResponse(res, {
        success: false,
        data: null,
        message: "Forbidden: Access denied",
        statusCode: 401,
      });
    }

    next();
  };
