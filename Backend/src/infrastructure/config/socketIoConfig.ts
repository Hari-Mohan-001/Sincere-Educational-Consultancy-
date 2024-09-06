import { Server } from "socket.io";
import messageModel from "../../presentation/models/messageModel";
import adminModel from "../../presentation/models/adminModel";
import userModel from "../../presentation/models/UserModel";

const configureSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_BASE_URL,
      methods: ["GET", "POST"], 
    },
  });

  const updateOnlineStatus = async (userId: string, role: string, isOnline: boolean) => {
    const lastSeen = isOnline ? null : new Date();
    if (role === "counsellor") {
      await adminModel.findByIdAndUpdate(userId, { isOnline, lastSeen });
    } else {
      await userModel.findByIdAndUpdate(userId, { isOnline, lastSeen }); 
    }
  };
 
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);  

    socket.on("join", async(userId:string , role:string) => {
      await updateOnlineStatus(userId, role, true);
      socket.join(userId);
      io.emit("userStatusChanged", { userId, isOnline: true });
    });

    // Listen for typing events
  socket.on("typing", ({ senderId, receiverId }) => {
    
    io.to(receiverId).emit("typing", { senderId, isTyping: true });
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("typing", { senderId, isTyping: false });
  });

    socket.on("sendMessage", async (messageData) => {
      try {
        const { senderId, senderModel, receiverId, receiverModel, content, image,audio } = messageData;
        const message = new messageModel({
          sender: senderId,
          senderModel,
          receiver: receiverId,
          receiverModel,
          content,
          image,
          audio
        });
        const savedMessage = await message.save();
    
        // Populate sender and receiver details
        const populatedMessage = await messageModel
          .findById(savedMessage._id)
          .populate("sender", "name")
          .populate("receiver", "name");

    // Emit notification event to recipient
    const notification ={ senderId:senderId,
    text: 'New message received',
    timestamp: new Date().toISOString(),
    }
    io.to(receiverId).emit('receiveNotification',notification)
    
        // Emit to the receiver
        io.to(receiverId).emit("newMessage", populatedMessage);
    
        // Emit to the sender
        socket.emit("newMessage", populatedMessage);
console.log('sender',senderId,'recever',receiverId);

    
   
    console.log('Notification emitted to:', receiverId);
      } catch (error) {
        console.error("Error handling sendMessage event:", error); 
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on('logoutChangeStatus', async(id:string,role:string)=>{
      let user
          if(role==='user'){
            user = await userModel.findById(id);
            await updateOnlineStatus(id,role, false);
            io.emit("userStatusChanged", { 
              userId: id, isOnline: false });
          }else{
            user = await adminModel.findById(id) 
            console.log('coun',user);
            await updateOnlineStatus(id,role, false);
            console.log("updated");
            io.emit("userStatusChanged", { userId: id, isOnline: false });  
          }
    })

     // Handle receiving offer from counselor and send to user
     socket.on("offer", (offer, userId,counselorId) => {
      console.log('offer received',offer);
      io.to(userId).emit("receiveOffer", offer,userId,counselorId);
    });

    // Handle receiving answer from user and send to counselor
    socket.on("answer", (answer, counselorId) => {
      io.to(counselorId).emit("receiveAnswer", answer);
    });

    // Handle receiving ICE candidates and send to peer
    socket.on("iceCandidate", (candidate, peerId) => {
      io.to(peerId).emit("receiveIceCandidate", candidate);
    });

    socket.on("disconnect", async () => {
      console.log("A user disconnected:", socket.id);
    });
    
  });

  return io;
};

export default configureSocket;
