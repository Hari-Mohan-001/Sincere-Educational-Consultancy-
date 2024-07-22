import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema)

export default enrollmentModel