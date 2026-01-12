import { Router } from "express";
import { BlogController } from "./blog.controller";
import { auth } from "../../middlewares/auth";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post(
  "/",
  auth,
  checkAuth("admin", "superadmin"),
  BlogController.createBlog
);
router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getABlog);
router.patch(
  "/:id",
  auth,
  checkAuth("admin", "superadmin"),
  BlogController.updateBlog
);
router.delete(
  "/:id",
  auth,
  checkAuth("admin", "superadmin"),
  BlogController.deleteABlog
);

export const blogRoutes = router;
