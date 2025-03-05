import mongoose, { Schema } from "mongoose";

const eventSchema = Schema({
  title: String,
  description: String,
  logo : String,
  guests: [String],
  images: [String],
  brochure: [String],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
