import mongoose, { Schema } from "mongoose";

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    enrollment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Enrollment",
        required:true,

    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Country",
        required:true
    },
    totalAmount:{
        type:String,
        required:true,
    },
    orderStatus:{
        type:String,
        required:true,
        default:"pending"
    },
    meetingSchedule:{
         date:{
            type:String,
            default:""
         },
         time:{
            type:String,
            default:""
         }
    },
    
},{timestamps:true})

const orderModel = mongoose.model("Order", OrderSchema)

export default orderModel