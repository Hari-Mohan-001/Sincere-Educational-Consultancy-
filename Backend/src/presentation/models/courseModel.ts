import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,

    },
    fees:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    logo:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    university:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"University",
        required:true
    },
},{timestamps:true})

const courseModel = mongoose.model("Course", courseSchema)

export default courseModel