import mongoose, { Schema } from "mongoose";

const deptProjectSchema=new Schema(
    {
        typeOfProject:String,
        faculty:String,
        titleofProject:String,
        year:String,
        sponsoringAgency:String,
        fundingAmount:Number,
        department:{
            type:String,
            enum: ["bs", "cse", "ece"],

        }
    }
)

const DeptProject=mongoose.model("DeptProject",deptProjectSchema);
export default DeptProject;
