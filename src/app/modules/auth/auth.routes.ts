import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";

const authRoutes = Router();

authRoutes.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.loginController,
);
authRoutes.post("/refresh-token", AuthController.refreshTokenController);
authRoutes.get("/me", checkAuth(), AuthController.meController);
authRoutes.post("/logout", AuthController.logoutController);

export default authRoutes;
