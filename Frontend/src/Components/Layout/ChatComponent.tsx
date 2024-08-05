import axios from "axios";
import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { BASE_URL, COUNSELLORBASEURL } from "../../Constants/Constants";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import ClipLoader from "react-spinners/ClipLoader";
import { chatApi } from "../Api/chatApi";

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
  };
  sender: {
    _id: string;
    name: string;
  };
  image?: string;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal visibility state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for image upload

  const fileRef = useRef<HTMLInputElement | null>(null);

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
    const BASEURL = isCounsellor ? COUNSELLORBASEURL : BASE_URL;
    const response = await axios.get(`${BASEURL}/messages`, {
      params: {
        counsellorId: counsellorId,
        counsellorModel: counsellorModel,
        userId: userId,
        userModel: userModel,
      },
      withCredentials: true,
    });

    const data = response.data.data;
    setMessages(data);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      } else {
        // setErrors("Error loading image");
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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((newMessage.trim() !== "" || selectedFile) && socket) {
      let imageUrl = "";
      if (selectedFile) {
        setIsLoading(true);
        try {
          console.log("Uploading image..."); // Debug log
          const response = await chatApi.uploadChatImage(image);
          imageUrl = response;
          console.log("Image uploaded successfully:", imageUrl); // Debug log
        } catch (error) {
          console.log(error);
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
      };

      socket.emit("sendMessage", messageData);
      setNewMessage(""); // Clear the message input
      setSelectedFile(null); // Clear the selected file
      setImage(null); // Clear the image preview
      setIsModalOpen(false); // Close the modal
    }
  };

  const cancelImagePreview = () => {
    setImage(null); // Clear image preview
    setSelectedFile(null); // Clear selected file
    setIsModalOpen(false); // Close modal on cancel
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-4 py-3">
          <h2 className="text-lg font-semibold">
            {messages.length > 0 &&
              (isCounsellor
                ? `Chat with ${messages[0].receiver.name}`
                : `Chat with ${messages[0].sender.name}`)}
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
        </div>

        {/* Input Area */}
        <div className="bg-gray-50 px-4 py-3">
          <form onSubmit={sendMessage} className="flex">
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer mr-2">
              <AddPhotoAlternateIcon />
            </label>
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
