
import VideoCallComponent from "../../Layout/VideoCallComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface LocationState {
  callId: string;
  incomingOffer: any;
}

const UserVideoCall = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation()
  const{ callId, incomingOffer }= location.state as LocationState
console.log('calid,ofer at vical',callId, incomingOffer);
useEffect(()=>{
},[])

  if (!user) return;
  return (
    <div>
      <VideoCallComponent
        role="user"
        userId={callId}
        userIncommingOffer={incomingOffer}
      />
    </div>
  );
};

export default UserVideoCall;
