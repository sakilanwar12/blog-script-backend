import { IBlog, ICreateBlog } from "./blog.interface";
import blogModel from "./blog.model";

const createBlog = async (input: ICreateBlog): Promise<IBlog> => {
  const blog = await blogModel.create({
    title: input.title,
    slug: input.slug,
    content: input.content,
    author: input.authorId,
    status: input.status,
  });
  return blog;
};

export const BlogService = {
  createBlog,
};