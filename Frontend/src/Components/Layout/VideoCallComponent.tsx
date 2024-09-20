import { useSocket } from "../../Context/SocketContext";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { CounsellorRootState } from "../../Interface/Counsellor/CounsellorInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface VideoCallComponentProps {
  userId: string;
  role: string;
  userIncommingOffer?: RTCSessionDescriptionInit;
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

    return () => {
      socket?.off("receiveAnswer", handleAnswer);
      socket?.off("receiveIceCandidate", handleIceCandidate);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [socket, userIncommingOffer]);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 h-screen">
  <div className="flex justify-around w-full">
    <div className="max-w-md border-solid mr-5">
      <h1 className="text-white">Local Video {localStream ? "yes" : "no"}</h1>
      <video className="rounded-2xl shadow-lg" ref={localVideoRef} autoPlay playsInline muted />
    </div>
    <div className="max-w-md">
      {remoteStream && <h1 className="text-white">Remote Video {remoteStream ? "yes" : "no"}</h1>}
      {remoteStream && <video className="rounded-2xl shadow-lg" ref={remoteVideoRef} autoPlay playsInline />}
      
    </div>
  </div>
  
  {role === "counsellor" && !isCallStarted && (
    <div className="flex justify-center mt-5">
      <Button onClick={startCall}>Start Call</Button>
    </div>
  )}

  {isCallStarted && (
    <div className="flex justify-center mt-5 space-x-4">
      <Button variant="contained" color="error" onClick={endCall}>End Call</Button>
      <Button variant="contained" color="warning" onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</Button>
    </div>
  )}
</div>
 
  );
};

export default VideoCallComponent;