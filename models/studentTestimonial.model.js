import mongoose, { Schema } from "mongoose";

const studentTestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Student's name is required !"],
    },
    registrationNumber: {
      type: String,
      required: [true, "registration number is required !"],
    },
    mobileNumber: Number,
    email: String,
    image: String,
    content: {
      type: String,
      required: [true, "content is required !"],
    },
  },
  { timestamps: true }
);

const StudentTestimonial = mongoose.model("StudentTestimonial", studentTestimonialSchema);
export default StudentTestimonial;