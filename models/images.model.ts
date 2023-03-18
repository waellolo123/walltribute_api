import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sharedLink: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    validated: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("images", imageSchema);
