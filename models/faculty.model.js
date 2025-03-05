import mongoose from "mongoose";
import { Schema } from "mongoose";

const facultySchema = new Schema(
    {
        name: {
            type: String,
            // required: true
        },
        designation:{
            type:String,
        },
        department: {
            type: String,
            // required: true,
            enum: ["cse", "ece", "bs"]
        },
        position: { 
            type: String,
            enum: ["hod", "faculty-member", "staff"], 
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
            link: { type: String },
            areaofResearch: {
                type: [String],
            },
            patent: { type: [String], }, // Changed to an array
            fundedProject: { type: [String], }, // Changed to an array
            reviewerofJournal: { type: [String],},
            researchProject: [
                {
                    year: { type: Number, /* required: true */ },
                    title: { type: String, /* required: true */ },
                    duration: { type: String, /* required: true */ }
                }
            ]
        },
        supervision: {
            phd: [
                {
                    year: { type: Number, /* required: true */ },
                    studentName: { type: String, /* required: true */ },
                    workDetails: { type: String, /* required: true */ },
                    status: { type: String, /* required: true */ },
                }
            ],
            MTech: { type: [String], /* required: true */ },
            BTech: { type: [String], /* required: true */ },
        },
        publication: {
            journals: [
                {
                    year: { type: Number, /* required: true */ },
                    papers: { type: [String], /* required: true */ } // Multiple journal articles per year
                }
            ],
            conferences: [
                {
                    year: { type: Number, /* required: true */ },
                    papers: { type: [String], /* required: true */ } // Multiple conference papers per year
                }
            ],
            books: [
                {
                    year: { type: Number, /* required: true */ },
                    papers: { type: [String], /* required: true */ } // Multiple books per year
                }
            ]
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