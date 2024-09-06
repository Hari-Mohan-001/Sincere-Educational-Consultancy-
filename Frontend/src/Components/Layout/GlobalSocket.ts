// import { useEffect, useRef } from "react";
// import io, { Socket } from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { updateNotifications } from "../../Redux/Notification/NotificationSlice";
// import { AppDispatch, StoreRootState } from "../../Redux/Store";
// import { SocketUrL } from "../../Constants/Constants";

// export const useSocket = () => {
//   const socketRef = useRef<Socket | null>(null);
//   const dispatch = useDispatch<AppDispatch>();
//   const { user } = useSelector((state: StoreRootState) => state.user);

//   useEffect(() => {
//     if (!socketRef.current) {
//       const newSocket = io(SocketUrL);
//       socketRef.current = newSocket;

//       newSocket.emit("join", user?.id);

//       newSocket.on("newMessage", (message) => {
//         const currentPath = `/chat/${user?.id}/${message.sender._id}`;
//         if (
//           message.sender._id !== user?.id &&
//           window.location.pathname !== currentPath
//         ) {
//           dispatch(
//             updateNotifications({
//               text: message.content || "New message received",
//               senderId: message.sender._id,
//               timestamp: new Date().toISOString(),
//             })
//           );
//         }
//       });
//     }

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [user?.id, dispatch]);

//   return socketRef.current;
// };
