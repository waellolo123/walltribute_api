import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      default: ["2"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
