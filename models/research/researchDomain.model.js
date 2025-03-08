import mongoose, { Schema } from "mongoose";

const researchDomainSchema = Schema(
  {
    title: {
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

const ResearchDomain = mongoose.model("ResearchDomain", researchDomainSchema);
export default ResearchDomain;