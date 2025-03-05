import mongoose, { Schema } from "mongoose";

const deptAchievementSchema = new Schema(
  {
    title:{type:String},
    year: { type: String },
    description:  [String ],
    department: {
      type: String,
      enum: ["bs", "cse", "ece"],
    },
  },
  { timestamps: true }
);

const DeptAchievement = mongoose.model("deptAchievement", deptAchievementSchema);
export default DeptAchievement;
