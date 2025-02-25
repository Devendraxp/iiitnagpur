import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const adminSchema = Schema(
  {},
  { timestamps: true }
);



adminSchema.plugin(passportLocalMongoose);
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
