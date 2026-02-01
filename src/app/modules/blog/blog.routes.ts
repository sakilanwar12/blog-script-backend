import { Router } from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/", checkAuth("admin", "superadmin"), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getABlog);
router.patch(
  "/:slug",
  checkAuth("admin", "superadmin"),
  BlogController.updateBlog,
);
router.delete(
  "/",
  checkAuth("admin", "superadmin"),
  BlogController.deleteABlog,
);

export const blogRoutes = router;
