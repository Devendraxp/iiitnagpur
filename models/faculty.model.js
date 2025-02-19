import mongoose from "mongoose";
import { Schema } from "mongoose";

const facultySchema = new Schema(
    {
        name: {
            type: String,
            // required: true
        },
        department: {
            type: String,
            // required: true
        },
        position: { 
            type: String,
        },
        image: {
            type: String,
        },
        education: {
            type: [String],
        },
        experience: {
            type: [String],
        },
        teaching: {
            type: [String],
        },
        research: {
            type: [String],
        },
        supervision: {
            type: String,
        },
        publication: {
            type: [String],
        },
        responsibility: {
            type: [String],
        },
        anyOther: { 
            type: [String],
        },
        username: {
            type: String,
            // unique: true,
            // required: true
        },
        email: {
            type: String,
            // unique: true,
            // required: true
        },
        socialLinks: {
            twitter: { type: String },
            linkedin: { type: String },
            github: { type: String },
            facebook: { type: String }
        }
    },
    { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
