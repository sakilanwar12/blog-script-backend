import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { envVariables } from "../../config";
import User from "../modules/user/user.model";
import sendResponse from "../../lib/sendResponse";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

/**
 * Authentication and authorization middleware
 * @param allowedRoles - Optional roles that are allowed to access the route
 * If no roles provided, only authentication is checked
 * If roles provided, both authentication and authorization are checked
 */
export const checkAuth =
  (...allowedRoles: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Step 1: Extract token from cookies (primary) or Authorization header (fallback)
      let token = req.cookies?.access_token;

      if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
          } else {
            token = authHeader;
          }
        }
      }

      if (!token) {
        return sendResponse(res, {
          success: false,
          data: null,
          message: "Unauthorized: Token missing",
          statusCode: 401,
        });
      }

      // Step 2: Verify token
      const decoded = jwt.verify(token, envVariables.JWT_ACCESS_TOKEN) as {
        userId: string;
        role: string;
      };

      // Step 3: Check if user exists and is active
      const user = await User.findById(decoded.userId);

      if (!user || !user.isActive) {
        return sendResponse(res, {
          success: false,
          data: null,
          message: "Unauthorized user",
          statusCode: 401,
        });
      }

      // Step 4: Attach user to request
      req.user = {
        userId: user._id.toString(),
        role: user.role,
      };

      // Step 5: Check role-based authorization (if roles specified)
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return sendResponse(res, {
          success: false,
          data: null,
          message: "Forbidden: Access denied",
          statusCode: 403,
        });
      }

      next();
    } catch (error) {
      return sendResponse(res, {
        success: false,
        data: null,
        message: "Invalid or expired token",
        statusCode: 401,
      });
    }
  };
