
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

 const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await AuthService.loginService(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

export const AuthController = {
    loginController
}
