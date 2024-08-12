// useSocket.ts
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotifications } from '../../Redux/Notification/NotificationSlice';
import { AppDispatch, StoreRootState } from '../../Redux/Store';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: StoreRootState) => state.user);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('join', user?.id);

    newSocket.on('newMessage', (message) => {
        const currentPath = `/chat/${user?.id}/${message.sender._id}`;
        // Only create a notification if the message is from a counsellor and not from the user
        if (message.sender._id !== user?.id && window.location.pathname !== currentPath) {
          dispatch(updateNotifications({
            text: message.content || 'New message received',
            senderId: message.sender._id,
            timestamp: new Date().toISOString(),
          }));
        }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id, dispatch]);

  return socket;
};