import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    mobile:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true
    },
    qualification:{
        type:String,
        enum:["PlusTwo", "Degree" , "Masters"],
        required:true
    },
    isEnrolled:{
        type:Boolean,
        default: false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }

}, {timestamps:true})

const userModel = mongoose.model("User", userSchema)

export default userModel