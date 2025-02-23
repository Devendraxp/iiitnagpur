import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const imageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: uuidv4(),
    },
    path: {
      String,
    },
    imageUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("ImageSchema", imageSchema);
export default Image;
