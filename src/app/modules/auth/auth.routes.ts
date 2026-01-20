import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";
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
export default authRoutes;