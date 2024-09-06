import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotifications } from '../Redux/Notification/NotificationSlice';
import { useSocket } from '../Context/SocketContext';



const useNotifications = () => {
  const dispatch = useDispatch();
  const {socket} = useSocket()
  useEffect(() => {
    console.log("Socket connection status:", socket?.connected); 
    if (socket) {
        socket.on('receiveNotification', (notification) => {
          console.log('Received notification:', notification);
          dispatch(updateNotifications(notification));
        });
      }else{
        console.log('nosocket', socket);
        
      }

    return () => {
      socket?.off('receiveNotification');
    };
  }, [dispatch,socket]);
};

export default useNotifications;
