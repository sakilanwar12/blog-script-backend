import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginValidationSchema, refreshTokenValidationSchema } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post(
    "/login",
    validateRequest(loginValidationSchema),
    AuthController.loginController
);
authRoutes.get(
    "/me",
    authMiddleware,
    AuthController.meController
);
authRoutes.post(
    "/refresh-token",
    validateRequest(refreshTokenValidationSchema),
    AuthController.refreshTokenController
);
export default authRoutes;