import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../../lib/catchAsync";
import sendResponse from "../../../lib/sendResponse";

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken, user } = await AuthService.loginService(
    email,
    password,
  );
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 5,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: user,
  });
});

const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const { accessToken, user } = await AuthService.refreshToken(refreshToken);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 5,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login again successful",
      data: user,
    });
  },
);
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

const logoutController = catchAsync(async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  if (refresh_token) {
    await AuthService.logoutService(refresh_token);
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    path: "/",
  };

  res.clearCookie("access_token", cookieOptions);

  res.clearCookie("refresh_token", cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logout successful",
    data: null,
  });
});

export const AuthController = {
  loginController,
  meController,
  refreshTokenController,
  logoutController,
};
