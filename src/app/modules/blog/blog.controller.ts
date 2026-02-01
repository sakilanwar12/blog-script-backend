import { Request, Response } from "express";
import catchAsync from "../../../lib/catchAsync";
import sendResponse from "../../../lib/sendResponse";
import { BlogService } from "./blog.services";
import { AuthRequest } from "../../middlewares/checkAuth";

const createBlog = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await BlogService.createBlog({
    ...req.body,
    authorId: req.user!.userId,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getABlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getABlog(req.params.slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog fetched successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await BlogService.updateBlog(req.params.slug, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteABlog = catchAsync(async (req: AuthRequest, res: Response) => {
    const ids = req.body.ids;

  if (!ids || (Array.isArray(ids) && ids.length === 0)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "No blog IDs provided for deletion",
      data:"No blog IDs provided for deletion"
    });
  }


  const result = await BlogService.deleteABlog(ids);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: Array.isArray(ids) ? "Blogs deleted successfully" : "Blog deleted successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getABlog,
  updateBlog,
  deleteABlog,
};
