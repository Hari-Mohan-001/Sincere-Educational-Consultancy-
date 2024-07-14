import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./User/UserSlice";
import CounsellorReducer from "./Counsellor/CounsellorSlice";

const rootReducer = combineReducers({ user: userReducer , counsellor:CounsellorReducer});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
