import { Router } from "express";
import { BlogController } from "./blog.controller";
import { auth } from "../../middlewares/auth";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/",auth,checkAuth("admin"), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getABlog);
router.patch("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteABlog);

export const blogRoutes = router;
