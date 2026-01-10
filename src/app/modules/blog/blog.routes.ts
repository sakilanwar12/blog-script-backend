import { Router } from "express";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/", BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getABlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteABlog);

export const blogRoutes = router;
