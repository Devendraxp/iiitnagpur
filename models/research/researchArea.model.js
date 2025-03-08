import mongoose, { Schema } from "mongoose";

const researchAreaSchema = Schema(
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

const ResearchArea = mongoose.model("ResearchArea", researchAreaSchema);
export default ResearchArea;