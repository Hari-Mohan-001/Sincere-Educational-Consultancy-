import { Server } from "socket.io";
import messageModel from "../../presentation/models/messageModel";
import mongoose from "mongoose";

const configureSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_BASE_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async (messageData) => {
      const {
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        content,
        image,
      } = messageData;
      const message = new messageModel({
        sender: senderId,
        senderModel,
        receiver: receiverId,
        receiverModel,
        content,
        image,
      });
      const savedMessage = await message.save();

      // Populate sender and receiver details
      const populatedMessage = await messageModel
        .findById(savedMessage._id)
        .populate("sender", "name")
        .populate("receiver", "name");
      // Convert the savedMessage to a plain object
      // const messageToSend = savedMessage.toObject();

      // Emit the full message object
      io.to(receiverId).emit("newMessage", populatedMessage);

      // Also emit to the sender to ensure they see their own message instantly
      //socket.emit('newMessage', messageToSend);

      io.to(senderId).emit("newMessage", populatedMessage);
    });
  });

  return io;
};

export default configureSocket;
