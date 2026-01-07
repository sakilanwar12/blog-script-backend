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

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await BlogService.updateBlog(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
};
