import { useState, useEffect, useRef } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"; 
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import ClipLoader from "react-spinners/ClipLoader";
import { chatApi } from "../../Api/chatApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
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
  receiver: {
    _id: string;
    name: string;
    image: string;
  };
  sender: {
    _id: string;
    name: string;
    image: string;
  };
  image?: string;
  audio?: string;
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
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for image upload
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // State to store recorded audio blob
  const [isRecording, setIsRecording] = useState<boolean>(false); // State to track if recording
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // MediaRecorder instance
  const dispatch = useDispatch<AppDispatch>();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit(
      "join",
      isCounsellor ? counsellorId : userId,
      isCounsellor ? "counsellor" : "user"
    );
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
            ? {
                ...prev,
                isOnline,
                lastSeen: isOnline ? null : new Date().toISOString(),
              }
            : null
        );
      }
    });

    socket.on("typing", ({ senderId, isTyping }) => {
      if (senderId !== (isCounsellor ? userId : counsellorId)) return;
      setIsTyping(true)
      setTypingUser(isTyping ? senderId : null);
    });

    return () => {
      socket.off("newMessage");
      socket.off("userStatusChanged");
      socket.off("typing");
    };
  }, [counsellorId, userId, isCounsellor, dispatch]);

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
        counsellorId: counsellorId,
        counsellorModel: counsellorModel,
        userId: userId,
        userModel: userModel,
      };
      const messages = await chatApi.fetchAllMessages(endPoint, params);
      const data = messages;
      setMessages(data);
      // Scroll to bottom after messages are set
      setTimeout(scrollToBottom, 100); // Small delay to ensure DOM update
    } catch (error) {
      toast.error("Failed to fetch messages.");
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      } else {
        toast.error("failed to load");
      }
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      previewFile(file);
      setIsModalOpen(true); // Open modal on image selection
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    console.log('typing');
    
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
    setIsTyping(false)
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



  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((newMessage.trim() !== "" || selectedFile || audioBlob) && socket) {
      let imageUrl = "";
      let audioUrl = "";
      if (selectedFile) {
        setIsLoading(true);
        try {
          const response = await chatApi.uploadChatImage(image);
          imageUrl = response;
          toast.success("Image send successfully");
        } catch (error) {
          console.log(error);
          toast.error("Failed to upload image");
        } finally {
          setIsLoading(false);
        }
      }

      if (audioBlob) {
        setIsLoading(true);
        try {
          // Convert Blob to Base64
          const base64Audio = await blobToBase64(audioBlob); 
          const response = await chatApi.uploadChatAudio(base64Audio, audioBlob);
           audioUrl = response;
          toast.success("Audio sent successfully");
        } catch (error) {
          console.log(error);
          toast.error("Failed to upload audio");
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
      };

      socket.emit("sendMessage", messageData);
     // setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage(""); // Clear the message input
      setSelectedFile(null); // Clear the selected file
      setAudioBlob(null);
      setImage(null); // Clear the image preview
      setIsModalOpen(false); // Close the modal

      // Scroll to bottom after sending
      setTimeout(scrollToBottom, 100);
      handleStopTyping()
    }
  };

  const cancelImagePreview = () => {
    setImage(null); // Clear image preview
    setSelectedFile(null); // Clear selected file
    setIsModalOpen(false); // Close modal on cancel
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
                    {isTyping && typingUser === (isCounsellor ? userId : counsellorId) ? (
                      <span className="text-gray-300 italic">Typing...</span>
                    ) : otherUser.isOnline ? (
                      <span className="text-green-400">● Online</span>
                    ) : (
                      <span className="text-gray-400">
                        {otherUser.lastSeen
                          ? `Last seen ${new Date(otherUser.lastSeen).toLocaleString()}`
                          : "Offline"}
                      </span>
                    )}
                  </span>
                </div>
              </>
            )}
          </h2>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto px-4 py-3">
          {messages?.map((message) => {
            const isSender =
              (isCounsellor && message.sender._id === counsellorId) ||
              (!isCounsellor && message.sender._id === userId);

            return (
              <div
                key={message._id}
                className={`mb-4 ${isSender ? "text-right" : "text-left"}`}
              >
                {/* Image Section */}
                {message.image && (
                  <div
                    className={`inline-block mb-1 ${
                      isSender ? "text-right" : "text-left"
                    }`}
                  >
                    <img
                      src={message.image}
                      alt="Sent"
                      className="max-w-48 h-auto rounded-md shadow-sm"
                    />
                  </div>
                )}

                {/* Audio Section */}
{message.audio && (
  <div
    className={`mb-1 ${isSender ? "text-right" : "text-left"}`}
  >
    <audio controls className="inline-block">
      <source src={message.audio} type="audio/webm" />
      Your browser does not support the audio element.
    </audio>
  </div>
)}

                {/* Text Section */}
                {message.content && (
                  <div
                    className={`inline-block px-3 py-2 rounded-lg ${
                      isSender
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                )}

                {/* Timestamp */}
                <small
                  className={`text-xs opacity-75 block mt-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-50 px-4 py-3">
        <div className="w-full">
          <form onSubmit={sendMessage} className="flex">
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            
            <label htmlFor="image-upload" className="cursor-pointer mr-2 mt-2">
              <AddPhotoAlternateIcon />
            </label>

            {isRecording ? (
          <button type="button" onClick={stopRecording}>
            <StopIcon />
          </button>
        ) : (
          <button type="button" onClick={startRecording}>
            <MicIcon />
          </button>
        )}

            <input
              type="text"
              value={newMessage}
              // onChange={(e) => setNewMessage(e.target.value)}
              onChange={handleTyping}
              onBlur={handleStopTyping}
              placeholder="Type a message..."
              className=" flex-grow px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
            >
             {audioBlob ? 'Send Audio': 'Send'} 
            </button>
            
          </form>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {isModalOpen && image && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={image}
              alt="Preview"
              className="max-w-md max-h-96 object-contain mb-4"
            />

            {isLoading && (
              <div className="flex justify-center items-center mb-4">
                <ClipLoader color="#4A90E2" loading={isLoading} size={30} />{" "}
                {/* Use ClipLoader */}
                <p className="ml-2">Uploading image...</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={cancelImagePreview}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
