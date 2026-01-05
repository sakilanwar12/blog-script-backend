import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../../lib/catchAsync";
import sendResponse from "../../../lib/sendResponse";

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthService.loginService(email, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = {
  loginController,
};
