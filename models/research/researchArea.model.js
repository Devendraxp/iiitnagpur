import mongoose, { Schema } from "mongoose";

const researchAreaSchema = Schema(
  {
    title:{
      type: String,
      required: [true, "Title is required"],
    },
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