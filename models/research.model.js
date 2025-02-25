import mongoose, { Schema } from "mongoose";

const researchSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "title is required !"],
    },
    description: {
      type: String,
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

const Research = mongoose.model("Research", researchSchema);
export default Research;
