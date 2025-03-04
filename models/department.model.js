import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: { type: String},
  about: { type: String },
  BOS: { type: String }, 
  achievements: { type: String},
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }],
  staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  project: { type: String }, 
  laboratory: { type: String }, 
  events: { type: String }
});

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
