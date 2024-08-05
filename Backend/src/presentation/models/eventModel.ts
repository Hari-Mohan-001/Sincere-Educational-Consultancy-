import mongoose, { Schema } from "mongoose";

const EventSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    userName:{
        type:String,
        required:true,

    },
    userEmail:{
        type:String,
        required:true
    },
    enrollType:{
        type:String,
        required:true,
    },
    enrollImage:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    selectedDateTime:{
        type:String,
        required:true,
    },
    counsellor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"admin",
        required:true,
    }, 
    
},{timestamps:true})

const eventModel = mongoose.model("Event", EventSchema)

export default eventModel