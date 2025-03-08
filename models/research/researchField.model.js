import mongoose, { Schema } from "mongoose";

const researchFieldSchema = Schema(
  {
    description: {
      type: [String],
      required: [true, "Description is required"],
    },
    department: {
      type: String,
      enum: ["cse", "ece", "bs"],
      required: [true, "Department is required"],
    }
  },
  { timestamps: true }
);

const ResearchField = mongoose.model("ResearchField", researchFieldSchema);
export default ResearchField;