import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface Notification {
    text: string;
    senderId: string;
    timestamp: string;
    // Add more fields if needed
  }

 export interface NotificationState{
    notifications:Notification[]
  }

  const initialState :NotificationState ={
    notifications:[]
  }

  const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    reducers:{
        updateNotifications: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
          },
          clearNotifications: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
              notification => notification.senderId !== action.payload
            );
          },
          clearAllNotifications: (state) => {
            state.notifications = [];
          }
    }
  })

  export const{updateNotifications,clearNotifications,clearAllNotifications} = notificationSlice.actions
  export default notificationSlice.reducer