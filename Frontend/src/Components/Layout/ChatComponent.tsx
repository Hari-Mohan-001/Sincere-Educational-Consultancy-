import { useState, useEffect, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import ClipLoader from "react-spinners/ClipLoader";
import { chatApi } from "../../Api/chatApi";
import { toast } from "react-toastify";
import { useSocket } from "../../Context/SocketContext";
import { blobToBase64 } from "../../Utils/Helpers/base64converter";

interface Data {
  counsellorId: string;
  counsellorModel: string;
  userId: string;
  userModel: string;
  isCounsellor: boolean;
}

interface Message {
  _id: string;
  content?: string;
  receiver: { _id: string; name: string; image: string };
  sender: { _id: string; name: string; image: string };
  image?: string;
  audio?: string;
  replyTo?: Message;
  timestamp: string;
}

interface User {
  _id: string;
  name: string;
  image: string;
  isOnline: boolean;
  lastSeen: string | null;
}

const ChatComponent = ({
  counsellorId,
  counsellorModel,
  userId,
  userModel,
  isCounsellor,
}: Data) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [replyMessage, setReplyMessage] = useState<Message | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;
    fetchMessages();
    fetchOtherUserStatus();

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    socket.on("userStatusChanged", ({ userId, isOnline }) => {
      if (userId === (isCounsellor ? userId : counsellorId)) {
        setOtherUser((prev) =>
          prev
            ? { ...prev, isOnline, lastSeen: isOnline ? null : new Date().toISOString() }
            : null
        );
      }
    });

    socket.on("typing", ({ senderId, isTyping }) => {
      if (senderId !== (isCounsellor ? userId : counsellorId)) return;
      setIsTyping(isTyping);
      setTypingUser(isTyping ? senderId : null);
    });

    return () => {
      socket.off("newMessage");
      socket.off("userStatusChanged");
      socket.off("typing");
    };
  }, [counsellorId, userId, isCounsellor]);

  const fetchOtherUserStatus = async () => {
    try {
      const otherUserId = isCounsellor ? userId : counsellorId;
      const response = await chatApi.fetchUserStatus(otherUserId, isCounsellor);
      setOtherUser(response);
    } catch (error) {
      toast.error("Failed to fetch user status.");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const endPoint = isCounsellor ? "counsellor" : "user";
      const params = {
        counsellorId,
        counsellorModel,
        userId,
        userModel,
      };
      const messages = await chatApi.fetchAllMessages(endPoint, params);
      setMessages(messages);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      toast.error("Failed to fetch messages.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          setIsModalOpen(true);
        } else {
          toast.error("Failed to load image.");
        }
      };
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    socket?.emit("typing", {
      senderId: isCounsellor ? counsellorId : userId,
      receiverId: isCounsellor ? userId : counsellorId,
    });
  };

  const handleStopTyping = () => {
    socket?.emit("stopTyping", {
      senderId: isCounsellor ? counsellorId : userId,
      receiverId: isCounsellor ? userId : counsellorId,
    });
    setIsTyping(false);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Audio recording is not supported by this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      toast.error("Failed to start recording.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleReply = (message: Message) => {
    setReplyMessage(message);
  };

  const sendMessage = async (e: React.FormEvent|null) => {
   if(e) e.preventDefault();
    if ((newMessage.trim() !== "" || selectedFile || audioBlob) && socket) {
      let imageUrl = "";
      let audioUrl = "";

      if (selectedFile) {
        setIsLoading(true);
        try {
          const response = await chatApi.uploadChatImage(image);
          imageUrl = response;
          toast.success("Image sent successfully.");
        } catch (error) {
          toast.error("Failed to upload image.");
        } finally {
          setIsLoading(false);
        }
      }

      if (audioBlob) {
        setIsLoading(true);
        try {
          const base64Audio = await blobToBase64(audioBlob);
          const response = await chatApi.uploadChatAudio(base64Audio, audioBlob);
          audioUrl = response;
          toast.success("Audio sent successfully.");
        } catch (error) {
          toast.error("Failed to upload audio.");
        } finally {
          setIsLoading(false);
        }
      }

      const messageData = {
        senderId: isCounsellor ? counsellorId : userId,
        senderModel: isCounsellor ? counsellorModel : userModel,
        receiverId: isCounsellor ? userId : counsellorId,
        receiverModel: isCounsellor ? userModel : counsellorModel,
        content: newMessage || "",
        image: imageUrl || "",
        audio: audioUrl || "",
        replyTo: replyMessage?._id || null,
      };

      socket.emit("sendMessage", messageData);
      setNewMessage("");
      setSelectedFile(null);
      setAudioBlob(null);
      setImage(null);
      setIsModalOpen(false);
      setReplyMessage(null);
      scrollToBottom();
      handleStopTyping();
    }
  };

  const cancelImagePreview = () => {
    setImage(null);
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
       
        {/* Header */}
        <div className="bg-indigo-600 text-white px-4 py-3">
          <h2 className="text-lg font-semibold flex items-center">
            {otherUser && (
              <>
                <img
                  src={otherUser.image}
                  alt={otherUser.name}
                  className="inline-block h-8 w-8 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <span>{` ${otherUser.name}`}</span>
                  <span className="text-sm">
                    {isTyping &&
                    typingUser === (isCounsellor ? userId : counsellorId) ? (
                      <span className="text-gray-300 italic">Typing...</span>
                    ) : otherUser.isOnline ? (
                      <span className="text-green-400">● Online</span>
                    ) : (
                      <span className="text-gray-400">
                        {otherUser.lastSeen
                          ? `Last seen ${new Date(
                              otherUser.lastSeen
                            ).toLocaleString()}`
                          : "Offline"}
                      </span>
                    )}
                  </span>
                </div>
              </>
            )}
          </h2>
        </div>
        {/* Messages */}
        <div className="p-4 overflow-y-auto h-96">
          {messages.map((message) => (
            <div key={message._id} className={`my-2 flex ${message.sender._id === (isCounsellor ? counsellorId : userId) ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-2 rounded-lg ${message.sender._id === (isCounsellor ? counsellorId : userId) ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.replyTo && (
                  <div className="border-l-4 border-indigo-400 pl-2 mb-2">
                    <span className="text-sm italic">Replying to: {message.replyTo.content}</span>
                  </div>
                )}
                {message.content && <p>{message.content}</p>}
                {message.image && <img src={message.image} alt="message" className="mt-2 max-w-full rounded-md" />}
                {message.audio && <audio controls className="mt-2 w-full" src={message.audio} />}
                <div className="flex justify-between text-xs mt-1 m-3">
                 
                  <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                  <div>
                  <button onClick={() => handleReply(message)} className="text-indigo-900 ml-2">Reply</button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div className="flex flex-col p-4 border-t">
  {replyMessage && (
    <div className="bg-gray-200 p-2 rounded-lg mb-2">
      <span>Replying to: {replyMessage.content}</span>
      <button onClick={() => setReplyMessage(null)} className="text-red-500 ml-2">Cancel</button>
    </div>
  )}
  <div className="flex items-center">
    <input
      type="text"
      value={newMessage}
      onChange={handleTyping}
      onBlur={handleStopTyping}
      placeholder="Type a message"
      className="flex-grow border border-gray-300 rounded-lg p-2"
    />
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      ref={fileRef}
      className="hidden"
    />
    <button onClick={() => fileRef.current?.click()} className="ml-2">
      <AddPhotoAlternateIcon />
    </button>
    <button onClick={isRecording ? stopRecording : startRecording} className="ml-2">
      {isRecording ? <StopIcon /> : <MicIcon />}
    </button>
    <button onClick={sendMessage} className="ml-2">
     {audioBlob ? "Send Audio":<SendIcon />} 
    </button>
  </div>
</div>

        {/* Image Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4">
              <img src={image || ""} alt="Preview" className="max-w-full h-auto rounded-md" />
              <div className="mt-4 flex justify-between">
                <button onClick={cancelImagePreview} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setImage(null);
                    sendMessage(null); // Adjust to send the message with image
                  }}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center p-4">
            <ClipLoader color={"#3b82f6"} loading={isLoading} size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
