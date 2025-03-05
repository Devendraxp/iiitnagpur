import mongoose, { Schema } from "mongoose";

const clubSchema = Schema({
  title: String,
  description: String,
  logo: String,
  Lead: String,
  category: {
    type: String,
    enum: ["technical", "cultural"],
  },
  yearlyPlans: [
    {
      title: String,
      description: String,
    },
  ],
  images: [String],
  brochure: String,
});

const Club = mongoose.model("Club", clubSchema);
export default Club;
