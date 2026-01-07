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

export const BlogService = {
  createBlog,
};
