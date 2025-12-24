import mongoose , { Schema} from "mongoose";


const notesSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "USERS",
        index : true
    },
    title : {
        type : String,
        required : true,  
    },
    description : {
        type : String,
    },
    resource : {
        type : String,
    },
    revisionStatus : {
        type : String,
        enum : ["pending","to-revise-again","completed"],
        default : "pending",
    }},{
        timestamps : true,
    }
);



const NOTES = mongoose.model("NOTES",notesSchema,"notes");

export default NOTES;