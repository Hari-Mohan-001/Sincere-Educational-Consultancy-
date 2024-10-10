import { useLocation } from "react-router-dom";
import VideoCallComponent from "../../Layout/VideoCallComponent";


interface LocationState {
  userId: string;
}

const CounsellorVideoCall = () => {
  const location = useLocation();
  const { userId } = location.state as LocationState;

  if (!userId ) {
    return <div>Error: Missing required parameters</div>;
  }
  
  return (
    <div>
      <VideoCallComponent
      userId={userId}
      role="counsellor"
      />
    </div>
  );
};

export default CounsellorVideoCall;
