import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearNotifications } from "../../Redux/Notification/NotificationSlice";
import { RootState } from "../../Interface/User/UserInterface";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { StoreRootState } from "../../Redux/Store";
import { CounsellorRootState } from "../../Interface/Counsellor/CounsellorInterface";

interface NotificationProps {
  role: string;
}

const NotificationComponent: React.FC<NotificationProps> = ({role}) => {
  const notifications = useSelector(
    (state: StoreRootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const { counsellor } = useSelector(
    (state: CounsellorRootState) => state.counsellor
  );

  
  useEffect(() => {
    console.log('Current notifications:', notifications);
  }, [notifications]);

  

  const handleNotificationClick = (senderId: string) => {
    // Assuming the user is always the recipient
    console.log(user, senderId);
    // navigate(`/chat/${user?.id}/${senderId}`);
    console.log('hiier',role);
    
    if(role==='user'){
      navigate(`/chat`, {
        state: { userId: user?.id, counsellorId: senderId },
      });
    }else{
      navigate(`/counsellor/chat`, {
        state: { counsellorId: counsellor?.id,userId: senderId },
      });
    }
    
    dispatch(clearNotifications(senderId));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;


  // Check if the current location is the chat page
  const isChatPage = location.pathname.includes("/chat");

  return (
    <div className="top-4 right-4 z-50">
      <IconButton onClick={handleClick} size="large">
         {/* Conditionally render the badge only when not on chat page */}
         {isChatPage ? (
          <NotificationsIcon />
        ) : (
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="p-2">
          {notifications.length === 0 ? (
            <p className="p-2">No new notifications</p>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-white hover:bg-gray-100 cursor-pointer p-2 border-b last:border-b-0"
                onClick={() => handleNotificationClick(notification.senderId)}
              >
                <p>{notification.text}</p>
                <small>
                  {new Date(notification.timestamp).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      </Popover>
    </div>
  );
};

export default NotificationComponent;
