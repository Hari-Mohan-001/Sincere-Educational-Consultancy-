import mongoose, { Schema } from "mongoose";

const universitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,

    },
    ranking:{
        type:Number
    },
    images:{
        type:Array
    },
    logo:{
        type:String,
        required:true
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Country",
        required:true
    }
},{timestamps:true})

const universityModel = mongoose.model("University", universitySchema)

export default universityModel