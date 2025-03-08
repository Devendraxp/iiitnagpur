import mongoose, { Schema } from "mongoose";

const deptEventSchema=new Schema({
    year:String,
    description:[String],
    department:{
        type:String,
        enum: ["bs", "cse", "ece"],

    }
})

const DeptEvents=mongoose.model("DeptEvents",deptEventSchema);
export default DeptEvents;