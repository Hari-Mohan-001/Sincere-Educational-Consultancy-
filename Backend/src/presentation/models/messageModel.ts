import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel'
      },
      senderModel: {
        type: String,
        required: true,
        enum: ['admin', 'User']
      },
      receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        refPath: 'receiverModel'
      },
      receiverModel: {
        type: String,
        required: true,
        enum: ['admin', 'User']
      },
      content: { 
        type: String,
        default:"",
      },
      image:{
             type:String,
             default:"",
      },
      audio:{
             type:String,
             default:"",
      },
      timestamp: { type: Date, default: Date.now }
})

const messageModel = mongoose.model("Message", messageSchema)

export default messageModel