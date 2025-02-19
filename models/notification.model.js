import mongoose, { Schema } from "mongoose";

const notificationSchema = Schema(
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
      enum: ["news", "event", "update"],
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    },
    link: {
      type: String,
      default: "https://iiitn.ac.in",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
