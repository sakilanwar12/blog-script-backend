import { Document, Types } from "mongoose";

export enum EBlogStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export type TBlogStatus = `${EBlogStatus}`;

export interface ICreateBlog {
  title: string;
  excerpt: string;
  content: any;
  authorId: string;
  status?: TBlogStatus;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  author: Types.ObjectId;
  status: TBlogStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
