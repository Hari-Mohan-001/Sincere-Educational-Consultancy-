import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Country",
        required:true
    },
    role:{
        type:String,
        enum:["admin", "counsellor"],
        default:"counsellor"
    },
    image:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7TKHo1NrGHSRkso1dt1oE04qoPOGEKCiUA&s',
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    lastSeen:{
        type:Date,
        default:null
    },
    isApproved:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

const adminModel = mongoose.model("admin", adminSchema)
export default adminModel