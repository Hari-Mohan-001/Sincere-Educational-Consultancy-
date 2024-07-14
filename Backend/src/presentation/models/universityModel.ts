import mongoose, { Schema } from "mongoose";

const universitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,

    },
    ranking:{
        type:String,
        required:true,
    },
    images:{
        type:Array,
        required:true,
    },
    logo:{
        type:String,
        required:true
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Country",
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const universityModel = mongoose.model("University", universitySchema)

export default universityModel