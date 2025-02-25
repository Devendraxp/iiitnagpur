import mongoose, { Schema } from "mongoose";

const achievementsSchema = Schema(
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
    image :{
      type : String
    },
    link: {
      type: String,
      default: "https://iiitn.ac.in",
    },
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementsSchema);
export default Achievement;
