import mongoose from "mongoose";
import { Schema } from "mongoose";
import Faculty from "./faculty.model";

const departmentSchema=new Schema({
    name:{
        type:String,
        enum:["ece","eci","cse"]
    },
    achievement:{
        type:String,
    },
    about:{
        type:String,
    },
    BOS:{
        type:String,
    },
    faculty:[{
        type:Schema.Types.ObjectId,
        ref:"Faculty",
    }],
    staff:[{
        type:Schema.Types.ObjectId,
        ref:"Faculty",
    }],
    events: { type: Schema.Types.Mixed }, // JSON file data
    laboratory: { type: Schema.Types.Mixed },
    project: { type: Schema.Types.Mixed },


});

const Department = mongoose.model("Department", departmentSchema);
export default Department;