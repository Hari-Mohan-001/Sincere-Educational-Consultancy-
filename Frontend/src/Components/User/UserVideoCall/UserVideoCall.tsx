import { useParams } from "react-router-dom";
import VideoCallComponent from "../../Layout/VideoCallComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";

const UserVideoCall = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { roomId } = useParams();
  if (!user || !roomId) return;
  return (
    <div>
      <VideoCallComponent
        isCounsellor={false}
        userId={user?.id}
        roomId={roomId}
      />
    </div>
  );
};

export default UserVideoCall;
