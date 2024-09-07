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
  currentUser: TUser | null;
  currentToken: string | null;
};

const initialState: TAuthState = {
  currentUser: null,
  currentToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      console.log(action.payload);
      state.currentUser = action.payload.user;
      state.currentToken = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.currentToken = null;
    },
  },
  extraReducers: (builder) => {
    // Handle loginUser success
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload.user; // Update user
        state.currentToken = payload.accessToken; // Update token
      }
    );
    // Handle registerUser success
    builder.addMatcher(
      api.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload.user; // Update user
        state.currentToken = payload.accessToken; // Update token
      }
    );
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.user.currentToken;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
