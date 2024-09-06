
import { useSocket } from "../../Context/SocketContext";
import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { CounsellorRootState } from "../../Interface/Counsellor/CounsellorInterface";

interface VideoCallComponentProps {
  userId: string;
  role: string;  
}


const VideoCallComponent: React.FC<VideoCallComponentProps> = ({ userId, role }) => {
  const { socket } = useSocket();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream|null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream|null>(null);
  const [isCallIncoming, setIsCallIncoming] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [incomingOffer, setIncomingOffer] = useState(null);  // Store the offer when receiving a call
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );

  const ICE_SERVERS = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
  };

  const initPeerConnection = () => {
    const peerConnection = new RTCPeerConnection(ICE_SERVERS);

    peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteVideoRef.current) { // Ensure the ref is not null
        remoteVideoRef.current.srcObject = remoteStream;
        setRemoteStream(remoteStream);
      }
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("iceCandidate", event.candidate, userId);
      }
    };

    return peerConnection;
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
      if(localVideoRef.current){
        localVideoRef.current.srcObject = stream;
      }
      

      const peerConnection = initPeerConnection();
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket?.emit("offer", offer, userId, counsellor?.id);  // Send offer to user
       if(peerConnectionRef.current){
        peerConnectionRef.current = peerConnection;
       }
      
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const acceptCall = async (offer:any) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if(localVideoRef.current){
        localVideoRef.current.srcObject = stream;
      }
      
      const peerConnection = initPeerConnection();
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket?.emit("answer", answer, userId);  // Send answer to counselor

      peerConnectionRef.current = peerConnection;
      
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  };

  const handleAnswer = async (answer:any) => {
    const peerConnection = peerConnectionRef.current;
    await peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleIceCandidate = async (candidate:any) => {
    const peerConnection = peerConnectionRef.current;
    await peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  useEffect(() => {
    console.log('connected videi socket',socket?.connected);
    
    socket?.on("receiveOffer", (offer) => {
      console.log('ofeer got for user',offer);
      
      setIncomingOffer(offer);   // Store the incoming offer
      setIsCallIncoming(true);   // Trigger the modal display
    });

    socket?.on("receiveAnswer", handleAnswer);
    socket?.on("receiveIceCandidate", handleIceCandidate);

    return () => {
      socket?.off("receiveOffer");
      socket?.off("receiveAnswer");
      socket?.off("receiveIceCandidate");
    };
  }, [socket]);

  const handleAcceptCall = () => {
    setIsCallIncoming(false);
    setIsCallAccepted(true);
    acceptCall(incomingOffer);  // Accept the incoming offer
  };

  const handleRejectCall = () => {
    setIsCallIncoming(false);
    setIsCallAccepted(false);
    // Optionally: send a reject event to the server
    socket?.emit("rejectCall", userId);
  };


  return (
    <div>
    <video ref={localVideoRef} autoPlay playsInline muted />
    <video ref={remoteVideoRef} autoPlay playsInline />

    {role === "counsellor" && <Button onClick={startCall}>Start Call</Button>}

    {role === "user" && <Button variant="contained" onClick={startCall}>Start Call</Button>}

    {/* Modal for Incoming Call */}
    <Dialog open={isCallIncoming} onClose={handleRejectCall}>
      <DialogTitle>Incoming Video Call</DialogTitle>
      <DialogContent>
        <p>Do you want to accept the incoming video call?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRejectCall} color="secondary">
          Reject
        </Button>
        <Button onClick={handleAcceptCall} color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default VideoCallComponent