
import VideoCallComponent from "../../Layout/VideoCallComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";

const UserVideoCall = () => {
  const { user } = useSelector((state: RootState) => state.user);
  if (!user) return;
  return (
    <div>
      <VideoCallComponent
        role="user"
        userId={user?.id}
      />
    </div>
  );
};

export default UserVideoCall;
