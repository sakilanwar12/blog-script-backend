import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/", checkAuth("admin", "superadmin"), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getABlog);
router.patch(
  "/:id",
  checkAuth("admin", "superadmin"),
  BlogController.updateBlog,
);
router.delete(
  "/:id",
  checkAuth("admin", "superadmin"),
  BlogController.deleteABlog,
);

export const blogRoutes = router;
