import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

const domainModel = mongoose.model("Domain", domainSchema)

export default domainModel