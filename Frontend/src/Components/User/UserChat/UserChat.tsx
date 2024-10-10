import { useLocation } from "react-router-dom";
import ChatComponent from "../../Layout/ChatComponent";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { AppDispatch } from "../../../Redux/Store";
import { clearNotifications } from "../../../Redux/Notification/NotificationSlice";

interface LocationState {
  counsellorId: string;
  userId: string;
}
const UserChat = () => {

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { userId,counsellorId } = location.state as LocationState;

  if (!counsellorId || !userId) {
    return <div>Error: Missing required parameters</div>;
  }
console.log('usr chat pag',userId,counsellorId);

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
