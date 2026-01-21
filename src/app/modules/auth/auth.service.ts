import bcrypt from "bcrypt";
import User from "../user/user.model";
import { envVariables } from "../../../config";

import { AppError } from "../../../lib/AppError";
import httpStatus from "http-status";
import { generateToken } from "../../../lib/generateToken";

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
  })
  const refreshToken = generateToken({
    payload: {
      userId: user._id,
      role: user.role,
    },
    secret: envVariables.JWT_REFRESH_TOKEN,
    expiresIn: "7d",
  })

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

const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const AuthService = {
  loginService,
  getMeService,
};
