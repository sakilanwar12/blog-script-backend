import { Request, Response } from "express";
import catchAsync from "../../../lib/catchAsync";
import sendResponse from "../../../lib/sendResponse";
import { BlogService } from "./blog.services";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
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

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlog(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteABlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteABlog(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted successfully",
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
