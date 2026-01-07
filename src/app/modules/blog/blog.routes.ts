import { Router } from "express";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);

export const blogRoutes = router;
