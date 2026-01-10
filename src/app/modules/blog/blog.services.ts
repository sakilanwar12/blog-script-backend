import { AppError } from "../../../lib/AppError";
import { IBlog, ICreateBlog } from "./blog.interface";
import blogModel from "./blog.model";
import { slugify } from "js-utility-method";
const createBlog = async (input: ICreateBlog): Promise<IBlog> => {
  const blogSlug = slugify(input?.title);
  let slug = blogSlug;
  let counter = 1;

  while (await blogModel.exists({ slug })) {
    slug = `${blogSlug}-${counter++}`;
  }
  const blog = await blogModel.create({
    title: input.title,
    slug: slug,
    content: input.content,
    author: input.authorId,
    status: input.status,
  });
  return blog;
};
const getAllBlogs = async (
  query: {
    search?: string;
    page?: number;
    limit?: number;
  }
): Promise<{
  data: IBlog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}> => {
  const {
    search = "",
    page = 1,
    limit = 10,
  } = query;

  const skip = (page - 1) * limit;

  const filter: any = {
    isDeleted: false,
  };

  // 🔍 Search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const [blogs, total] = await Promise.all([
    blogModel
      .find(filter)
      .populate("author", "_id name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    blogModel.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: blogs,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

const getABlog = async (slug: string): Promise<IBlog> => {
  const blog = await blogModel
    .findOne({ slug })
    .populate("author", "_id name email");

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  return blog;
};

const updateBlog = async (
  blogId: string,
  payload: Partial<{
    title: string;
    content: string;
    status: "draft" | "published";
  }>
): Promise<IBlog | null> => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(400, "Update payload is required");
  }

  const blog = await blogModel.findById(blogId);

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  // If title changes, regenerate slug
  if (payload.title && payload.title !== blog.title) {
    const baseSlug = slugify(payload.title);
    let slug = baseSlug;
    let counter = 1;

    while (await blogModel.exists({ slug, _id: { $ne: blogId } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    blog.title = payload.title;
    blog.slug = slug;
  }

  if (payload.content) {
    blog.content = payload.content;
  }

  if (payload.status) {
    blog.status = payload.status;
  }

  await blog.save();

  return blog;
};
const deleteABlog = async (blogId: string) => {
  const blog = await blogModel.findById(blogId);

  if (!blog || blog.isDeleted) {
    throw new AppError(404, "Blog not found");
  }

  blog.isDeleted = true;
  await blog.save();

  return blog;
};
export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getABlog,
  deleteABlog,
};
