// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./features/userSlice";
import facilityReducer from "./features/facilitySlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configure persistence for the user slice
const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: persistedUserReducer, 
    facility: facilityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

