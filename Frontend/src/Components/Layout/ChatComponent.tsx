import axios from "axios";
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { BASE_URL, COUNSELLORBASEURL } from "../../Constants/Constants";

interface Data {
  counsellorId: string;
  counsellorModel: string;
  userId: string;
  userModel: string;
  isCounsellor:boolean
}

interface Message {
  _id: string;
  content: string;
  receiver:{
    _id:string,
    name:string
  }
  sender:{
    _id:string,
    name:string
  }
  timestamp: string;
}

const ChatComponent = ({
  counsellorId,
  counsellorModel,
  userId,
  userModel,
  isCounsellor,
}: Data) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.emit("join", isCounsellor ? counsellorId : userId);

    fetchMessages();

    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [counsellorId, userId, isCounsellor]);

  const fetchMessages = async () => {
    const BASEURL = isCounsellor ? COUNSELLORBASEURL : BASE_URL 
    const response = await axios.get(`${BASEURL}/messages`,{
        params: {
            counsellorId: counsellorId,
            counsellorModel: counsellorModel,
            userId: userId,
            userModel: userModel,
          },
          withCredentials:true
    });
    console.log('msg',response.data);
    
    const data = response.data.data
    setMessages(data);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "" && socket) {
      const messageData = {
        senderId: isCounsellor? counsellorId:userId,
        senderModel: isCounsellor? counsellorModel:userModel,
        receiverId: isCounsellor? userId: counsellorId,
        receiverModel: isCounsellor? userModel:counsellorModel,
        content: newMessage,
      };
         // Create a new message object
    // const newMessageObject: Message = {
    //   _id: Date.now().toString(), // Temporary ID
    //   content: newMessage,
    //   sender: isCounsellor ? counsellorId : userId,
    //   timestamp: new Date().toISOString()
    // };
        // Add the new message to the local state
        // setMessages(prevMessages => [...prevMessages, newMessageObject]);

      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-4 py-3">
          <h2 className="text-lg font-semibold">{messages.length > 0 && (
      isCounsellor
        ? `Chat with ${messages[0].receiver.name}`
        : `Chat with ${messages[0].sender.name}`
    )}</h2>
        </div>
  
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto px-4 py-3">
          {messages?.map((message) => (
            <div
              key={message._id}
              className={`mb-4 ${
                (isCounsellor && message.sender._id === counsellorId) || 
        (!isCounsellor && message.sender._id === userId)
                  ? "text-right"
                  : "text-left"
              }`}
            >
             
              <div
                className={`inline-block px-3 py-2 rounded-lg ${
                  (isCounsellor && message.sender._id === counsellorId) || 
                  (!isCounsellor && message.sender._id === userId)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{message.content}</p>
                <small className="text-xs opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
        </div>
  
        {/* Input Area */}
        <div className="bg-gray-50 px-4 py-3">
          <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
