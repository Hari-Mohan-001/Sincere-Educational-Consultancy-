import { useLocation } from "react-router-dom";
import ChatComponent from "../../Layout/ChatComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { useEffect } from "react";
import { AppDispatch } from "../../../Redux/Store";
import { clearNotifications } from "../../../Redux/Notification/NotificationSlice";

interface LocationState {
  counsellorId: string;
  userId: string;
}
const UserChat = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { userId,counsellorId } = location.state as LocationState;

  if (!counsellorId || !userId) {
    return <div>Error: Missing required parameters</div>;
  }

  useEffect(() => {
    dispatch(clearNotifications(userId));
  }, [dispatch]);
  return (
    <div>
      <ChatComponent
        counsellorId={counsellorId}
        counsellorModel="admin"
        userId={userId}
        userModel="User"
        isCounsellor={false}
      />
    </div>
  );
};

export default UserChat;
