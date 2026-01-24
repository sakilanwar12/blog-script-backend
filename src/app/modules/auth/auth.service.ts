import bcrypt from "bcrypt";
import User from "../user/user.model";
import { envVariables } from "../../../config";

import { AppError } from "../../../lib/AppError";
import httpStatus from "http-status";
import { generateToken, verifyToken } from "../../../lib/generateToken";
import { RefreshToken } from "./auth.model";

const loginService = async (email: string, password: string) => {
  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required",
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  if (!user.isActive) {
    throw new AppError(httpStatus.FORBIDDEN, "Account is disabled");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const accessToken = generateToken({
    payload: {
      userId: user._id,
      role: user.role,
    },
    secret: envVariables.JWT_ACCESS_TOKEN,
    expiresIn: "5m",
  });
  const refreshToken = generateToken({
    payload: {
      userId: user._id,
      role: user.role,
    },
    secret: envVariables.JWT_REFRESH_TOKEN,
    expiresIn: "7d",
  });
  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
  });
  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing");
  }
  const decodedToken = verifyToken(token, envVariables.JWT_REFRESH_TOKEN);
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const accessToken = generateToken({
    payload: {
      userId: user._id,
      role: user.role,
    },
    secret: envVariables.JWT_ACCESS_TOKEN,
    expiresIn: "5m",
  });

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const logoutService = async (token: string) => {
  await RefreshToken.findOneAndDelete({ token });
};

export const AuthService = {
  loginService,
  getMeService,
  refreshToken,
  logoutService,
};
