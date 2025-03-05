import mongoose, { Schema } from "mongoose";

const organizedEventSchema = Schema({
    title : String,
    description : String,
    images : [String],
    eventName : {
        type : String,
        enum : ["tantrafiesta","abhivyakti","esummit", "selfhosted"]
    },
    clubName : {
        type : String,
        enum : ["dotslash","elevate", "strokes","iotics","dimensions", "udyam", "crispr", "crescendo", "dtraxia", "estoria", "orator", "probe", "eklavya", "selfhosted"]
    }

})


const OrganizedEvent = mongoose.model("OrganizedEvent", organizedEventSchema);
export default OrganizedEvent;