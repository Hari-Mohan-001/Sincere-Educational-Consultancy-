import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./User/UserSlice";
import CounsellorReducer from "./Counsellor/CounsellorSlice";
import adminReducer from "./Admin/AdminSlice";
import notificationReducer from "./Notification/NotificationSlice"
import callReducer from "./IncommingVideoCall/IncommingCallSlice";


const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'], // Only persist the user data
};

const counsellorPersistConfig = {
  key: 'counsellor',
  storage,
  whitelist: ['counsellor'], // Only persist the counsellor data
};

const adminPersistConfig = {
  key: 'admin',
  storage,
  whitelist: ['admin'], // Only persist the admin data
};

const notificationPersistConfig = {
  key: 'notifications',
  storage,
  whitelist: ['notifications'], // Only persist the admin data
};
const incommingCallPersistConfig = {
  key: 'incommingCall',
  storage,
  whitelist: ['incommingCall'], // Only persist the admin data
};


// const rootReducer = combineReducers({
//   counsellor: CounsellorReducer,
//   user: userReducer,
//   admin: adminReducer,
//   notifications: notificationReducer, 
//   incomingCall:callReducer
// });

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  counsellor: persistReducer(counsellorPersistConfig, CounsellorReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
  notifications: persistReducer(notificationPersistConfig, notificationReducer),
  incomingCall: persistReducer(incommingCallPersistConfig, callReducer)
});

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
 
// };

// Main persist configuration for the root reducer
const rootPersistConfig = {
  key: 'root',
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
export type StoreRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
