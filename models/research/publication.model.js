import mongoose, { Schema } from "mongoose";

const publicationSchema = Schema(
  {
    description: {
      type: [String],
      required: [true, "Description is required"],
    },
    year: {
      type: Number,
      required: [true, "Publication year is required"],
    },
    department: {
      type: String,
      enum: ["cse", "ece", "bs"],
      required: [true, "Department is required"],
    },
    type: {
      type: String,
      enum: ["bookChapter", "confrencePaper", "journal"],
      required: [true, "Publication type is required"],
    }
  },
  { timestamps: true }
);

const Publication = mongoose.model("Publication", publicationSchema);
export default Publication;