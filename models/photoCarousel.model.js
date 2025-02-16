import mongoose, { Schema } from "mongoose";

const photoCarouselSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "image url is required"],
    },
    title: {
      type: String,
      required: [true, "title is required !"],
    },
    link: {
      type: String,
      default: "iiitn.ac.in",
    },
  },
  { timestamps: true }
);

const PhotoCarousel = mongoose.model("PhotoCarousel", photoCarouselSchema);
export default PhotoCarousel;
