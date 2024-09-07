// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { RootState } from "../store";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      console.log(action.payload);
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.currentUser = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Handle loginUser success
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.accessToken;
      }
    );
    // Handle registerUser success
    builder.addMatcher(
      api.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.accessToken;
      }
    );
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.user.token;
export const selectCurrentUser = (state: RootState) => state.user.user;
