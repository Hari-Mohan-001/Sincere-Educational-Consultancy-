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
    image:{
        type:String,
        default:"https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
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