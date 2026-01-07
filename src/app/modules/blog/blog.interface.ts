import { Document, Types } from "mongoose";

export enum EBlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export type TBlogStatus = `${EBlogStatus}`;

export interface ICreateBlog {
  title: string;
  content: string;
  authorId: string;
  status?: TBlogStatus;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  status: TBlogStatus;
  createdAt: Date;
  updatedAt: Date;
}
