import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../../lib/catchAsync";
import sendResponse from "../../../lib/sendResponse";

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthService.loginService(email, password);
  res.cookie("access_token", result?.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60, // 1 hour
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

const meController = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AuthService.getMeService(user?.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const AuthController = {
  loginController,
  meController,
};
