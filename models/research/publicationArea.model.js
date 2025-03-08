import mongoose, { Schema } from "mongoose";

const publicationAreaSchema = Schema(
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

const PublicationArea = mongoose.model("PublicationArea", publicationAreaSchema);
export default PublicationArea;