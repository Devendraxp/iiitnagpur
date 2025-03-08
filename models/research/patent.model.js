import mongoose, { Schema } from "mongoose";

const patentSchema = Schema(
  {
    inventor: {
      type: [String],
      required: [true, "Inventor(s) name is required"],
    },
    patentNo: {
      type: String,
      required: [true, "Patent number is required"],
    },
    state: {
      type: String,
      enum: ["filed", "published", "granted"],
      required: [true, "Patent state is required"],
    },
    title: {
      type: String,
      required: [true, "Patent title is required"],
    },
    department: {
      type: String,
      enum: ["cse", "ece", "bs"],
      required: [true, "Department is required"],
    }
  },
  { timestamps: true }
);

const Patent = mongoose.model("Patent", patentSchema);
export default Patent;