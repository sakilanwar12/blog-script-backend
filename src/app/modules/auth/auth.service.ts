import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model";
import { envVariables } from "../../../config";

import { AppError } from "../../../lib/AppError";
import httpStatus from "http-status";

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

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    envVariables.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthService = {
  loginService,
};
