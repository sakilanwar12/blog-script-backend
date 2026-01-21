import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    deviceInfo: { 
      type: String,
    },
  },
  { timestamps: true }
);

export const RefreshToken = model("RefreshToken", refreshTokenSchema);
