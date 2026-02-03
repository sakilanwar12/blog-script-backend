import { AppError } from "../../../lib/AppError";
import { IBlog, ICreateBlog, TBlogStatus } from "./blog.interface";
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
    excerpt: input.excerpt,
    content: input.content,
    author: input.authorId,
    status: input.status,
  });
  return blog;
};
const getAllBlogs = async (query: {
  search?: string;
  page?: number;
  limit?: number;
  post_status?: TBlogStatus;
}): Promise<{
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
  const { search = "", page = 1, limit = 10, post_status } = query;

  const skip = (page - 1) * limit;

  const filter: any = {};

  // Status filtering
  if (post_status === "trashed") {
    // Trash tab
    filter.status = "trashed";
  } else if (post_status === "published") {
    filter.status = "published";
  } else if (post_status === "draft") {
    filter.status = "draft";
  } else {
    // ALL tab → published + draft
    filter.status = { $in: ["published", "draft"] };
  }
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
      .select("-content")
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
  blogSlug: string,
  payload: Partial<{
    title: string;
    excerpt: string;
    content: any;
    status: "draft" | "published";
  }>,
): Promise<IBlog | null> => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(400, "Update payload is required");
  }


  const blog = await blogModel.findOne({ slug: blogSlug });

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  // If title changes, regenerate slug
  if (payload.title && payload.title !== blog.title) {
    const baseSlug = slugify(payload.title);
    let slug = baseSlug;
    let counter = 1;

    while (await blogModel.exists({ slug, _id: { $ne: blogSlug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    blog.title = payload.title;
    blog.slug = slug;
  }

  if (payload.excerpt) {
    blog.excerpt = payload.excerpt;
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

export const deleteABlog = async (ids: string[] | string) => {
  // normalize to array
  const idArray = Array.isArray(ids) ? ids : [ids];

  if (idArray.length === 0) {
    throw new AppError(400, "No IDs provided for deletion");
  }

  const result = await blogModel.updateMany(
    { _id: { $in: idArray }, status: { $ne: "trashed" } },
    {
      $set: {
        status: "trashed",
        deletedAt: new Date(),
      },
    }
  );

  return {
    trashedCount: result.modifiedCount,
  };
};
export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getABlog,
  deleteABlog,
};
