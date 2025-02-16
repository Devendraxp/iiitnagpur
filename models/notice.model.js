import mongoose, { Schema } from "mongoose";

const noticeSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "title is required !"],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["faculty", "student"],
    },
    link: {
      type: String,
      default: "https://iiitn.ac.in",
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
