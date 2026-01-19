import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";

const authRoutes = Router();

authRoutes.post(
    "/login",
    validateRequest(loginValidationSchema),
    AuthController.loginController
);

export default authRoutes;