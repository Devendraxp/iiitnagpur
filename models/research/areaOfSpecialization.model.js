import mongoose, { Schema } from "mongoose";

const areaOfSpecializationSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    areaOfSpecialization: {
      type: String,
      required: [true, "Area of specialization is required"],
    },
    department: {
      type: String,
      enum: ["cse", "ece", "bs"],
      required: [true, "Department is required"],
    }
  },
  { timestamps: true }
);

const AreaOfSpecialization = mongoose.model("AreaOfSpecialization", areaOfSpecializationSchema);

export default AreaOfSpecialization ;
