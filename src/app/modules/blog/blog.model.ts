import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: false, unique: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default model<IBlog>("Blog", blogSchema);