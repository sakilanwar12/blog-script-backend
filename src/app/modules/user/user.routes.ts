import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.registerUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export const userRoutes = router;
