import { useSocket } from "../../Context/SocketContext";
import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { CounsellorRootState } from "../../Interface/Counsellor/CounsellorInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface VideoCallComponentProps {
  userId: string;
  role: string;
  userIncommingOffer?: RTCSessionDescriptionInit;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

const VideoCallComponent: React.FC<VideoCallComponentProps> = ({ userId, role, userIncommingOffer }) => {
  const { socket } = useSocket();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false); // For hiding the Start button
  const [isMuted, setIsMuted] = useState(false); // For mute/unmute
  const { counsellor } = useSelector((state: CounsellorRootState) => state.counsellor);
  const navigate = useNavigate()
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const screenStreamRef = useRef<MediaStream | null>(null);
  
  

  const ICE_SERVERS = {
    iceServers: [
      {urls: ["stun:stun.l.google.com:19302" ,"stun:global.stun.twilio.com:3478"]}
      ]
  };

  useEffect(() => {
    if(role==="counsellor"){ 

      const initCall = async()=>{
        console.log("Starting call");
      const stream = await startLocalStream();
      if (!stream) return;

      const peerConnection = createPeerConnection();

      stream.getTracks().forEach((track) => {
        console.log("Adding track to peer connection", track);
        peerConnection.addTrack(track, stream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log("Sending offer", offer);
      socket?.emit("initCall", offer, userId, counsellor?.id);
      }
      initCall()
      
    }
  }, []);

  useEffect(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          console.log("Received remote track", event.streams[0]);
  
          // Only set the remote stream if it's not already set
          if (!remoteStream) {
            setRemoteStream(event.streams[0]);
            console.log("Setting remote stream from ontrack");
          }
        }
      };
    }
  }, [remoteStream]);
  

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      console.log("Setting remote stream", remoteStream);
      remoteVideoRef.current.srcObject = remoteStream;
  
      // Attempt to play the video
      remoteVideoRef.current.play().catch(error => {
        console.error("Error playing remote video:", error);
      });
  
      // Wait for the video metadata to load before playing
      const handleLoadedMetadata = () => {
        console.log("Remote video metadata loaded, attempting to play");
        remoteVideoRef.current?.play().catch((error) => {
          console.error("Error playing remote video after metadata load:", error);
        });
      };
  
      remoteVideoRef.current.onloadedmetadata = handleLoadedMetadata;
  
      return () => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.onloadedmetadata = null;
        }
      };
    }
  }, [remoteStream]);
  
  

  const createPeerConnection = () => {
    console.log("Creating new peer connection");
    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.ontrack = (event) => {
      console.log("Received remote track", event.streams[0]);
      
      if (event.streams && event.streams[0]) {
        console.log("Setting remote stream from ontrack");
        setRemoteStream(event.streams[0]);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate", event.candidate);
        socket?.emit("iceCandidate", event.candidate, userId);
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log("ICE connection state changed:", pc.iceConnectionState);
    };

    pc.onnegotiationneeded = () => {
      console.log("Negotiation needed");
    };

    peerConnectionRef.current = pc;
    return pc;
  };

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Local stream started", stream);
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("Error getting local stream:", error);
      return null;
    }
  };

  const startCall = async () => {
    try {
      console.log("Starting call");
      const stream = await startLocalStream();
      if (!stream) return;

      const peerConnection = createPeerConnection();

      stream.getTracks().forEach((track) => {
        console.log("Adding track to peer connection", track);
        peerConnection.addTrack(track, stream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log("Sending offer", offer);
      socket?.emit("offer", offer, userId, counsellor?.id);
      setIsCallStarted(true); // Hide start button when the call starts
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const acceptInit = async()=>{
    const stream = await startLocalStream();
      if (!stream) return;

      const peerConnection = createPeerConnection();

      stream.getTracks().forEach((track) => {
        console.log("Adding track to peer connection", track);
        peerConnection.addTrack(track, stream);
      });

  }

  const acceptCall = async (offer: RTCSessionDescriptionInit) => {
    try {
      console.log("Accepting call with offer", offer);
      const stream = await startLocalStream();
      if (!stream) return;

      const peerConnection = createPeerConnection();

      stream.getTracks().forEach((track) => {
        console.log("Adding track to peer connection", track);
        peerConnection.addTrack(track, stream);
      });

      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      console.log("Sending answer", answer);
      
      socket?.emit("answer", answer, userId);

      setIsCallAccepted(true);
      setIsCallStarted(true); // Hide start button when the call is accepted
      console.log(isCallAccepted);
      
   
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log("Received answer", answer);
    
    const peerConnection = peerConnectionRef.current;
    if (peerConnection && peerConnection.signalingState !== "stable") {
      try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log("Remote description set successfully");
      } catch (error) {
        console.error("Error setting remote description:", error);
      }
    } else {
      console.log("Ignoring answer, peer connection is already stable or doesn't exist");
    }
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    console.log("Received ICE candidate", candidate);
    const peerConnection = peerConnectionRef.current;
    if (peerConnection && peerConnection.remoteDescription) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log("ICE candidate added successfully");
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    } else {
      console.log("Ignoring ICE candidate, peer connection not ready");
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    localStream?.getTracks().forEach((track) => track.stop());
    setIsCallStarted(false); // Show start button again after the call ends
    setIsCallAccepted(false);
     toast.success('Call ended')
     if(role=== "counsellor"){
      navigate('/counsellor/students')
     }else{
      navigate('/home')
     }
     
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendChatMessage();
    }
  };
  const sendChatMessage = () => {
    if (currentMessage.trim() !== "") {
      const newMessage: ChatMessage = {
        sender: role,
        message: currentMessage,
        timestamp: new Date(),
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      socket?.emit("chatMessage", newMessage, userId);
      setCurrentMessage("");
    }
  };

  const handleChatMessage = (message: ChatMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = stream;
      setIsScreenSharing(true);

      const screenTrack = stream.getVideoTracks()[0];
      if (peerConnectionRef.current) {
        const senders = peerConnectionRef.current.getSenders();
        const sender = senders.find(s => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(screenTrack);
        } else {
          peerConnectionRef.current.addTrack(screenTrack, stream);
        }
      }

      screenTrack.onended = () => {
        stopScreenShare();
      };

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error starting screen share:", error);
      toast.error("Failed to start screen sharing");
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);

    if (localStream && peerConnectionRef.current) {
      const videoTrack = localStream.getVideoTracks()[0];
      const senders = peerConnectionRef.current.getSenders();
      const sender = senders.find(s => s.track?.kind === 'video');
      if (sender && videoTrack) {
        sender.replaceTrack(videoTrack);
      }
    }

    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  };

  useEffect(() => {
    console.log("Component mounted, role:", role);
    if (userIncommingOffer) {
      console.log("Incoming offer detected", userIncommingOffer);
      acceptCall(userIncommingOffer);
    }else if(userIncommingOffer==null){
      console.log('null offer');
      acceptInit()
      
    }

    socket?.on("receiveAnswer", handleAnswer);
    socket?.on("receiveIceCandidate", handleIceCandidate);
    socket?.on("receiveChatMessage", handleChatMessage);

    return () => {
      socket?.off("receiveAnswer", handleAnswer);
      socket?.off("receiveIceCandidate", handleIceCandidate);
      socket?.off("receiveChatMessage", handleChatMessage);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [socket, userIncommingOffer]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);
    
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900">
      {/* Left side: Video streams */}
      <div className="lg:w-2/3 w-full flex flex-col p-4 h-full">
        <div className="flex-1 flex flex-col lg:flex-row space-x-4">
          {/* Local Video */}
          <div className="w-full lg:w-1/2 flex flex-col mb-4 lg:mb-0">
            <h1 className="text-white mb-2">
              Local Video {localStream ? "(Active)" : "(Inactive)"}
            </h1>
            <div className="flex-1 relative">
              <video
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
              />
            </div>
          </div>
  
          {/* Remote Video */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-white mb-2">
              Remote Video {remoteStream ? "(Active)" : "(Inactive)"}
            </h1>
            <div className="flex-1 relative">
              {remoteStream && (
                <video
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                />
              )}
            </div>
          </div>
        </div>
  
        {/* Call control buttons */}
        <div className="mt-4 flex justify-center space-x-4">
          {role === "counsellor" && !isCallStarted && (
            <Button variant="contained" color="primary" onClick={startCall}>
              Start Call
            </Button>
          )}
          {isCallStarted && (
            <>
              <Button variant="contained" color="error" onClick={endCall}>
                End Call
              </Button>
              <Button variant="contained" color="warning" onClick={toggleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={isScreenSharing ? stopScreenShare : startScreenShare}
              >
                {isScreenSharing ? "Stop Sharing" : "Share Screen"}
              </Button>
            </>
          )}
        </div>
      </div>
  
      {/* Right side: Chat */}
      <div className="w-full lg:w-1/3 flex flex-col bg-gray-800 p-4 h-full">
        <h2 className="text-white text-xl mb-4">Chat</h2>
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === role ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === role
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {msg.message}
              </span>
            </div>
          ))}
        </div>
  
        {/* Message input */}
        <div className="flex">
          <TextField
            fullWidth
            variant="outlined"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="bg-white rounded-l-lg"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendChatMessage}
            className="rounded-r-lg"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default VideoCallComponent;