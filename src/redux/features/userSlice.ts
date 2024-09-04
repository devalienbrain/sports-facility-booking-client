

// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// export type TUser = {
//   userId: string;
//   role: string;
//   iat: number;
//   exp: number;
// };

// type TAuthState = {
//   currentUser: null | TUser;
//   token: null | string;
// };

// const initialState: TAuthState = {
//   currentUser: null,
//   token: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       console.log(action.payload);
//       // const { user, token } = action.payload;
//       state.currentUser = action.payload;
//       // state.token = token;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logout } = userSlice.actions;

// export default userSlice.reducer;

// export const useCurrentToken = (state: RootState) => state.user.token;
// export const selectCurrentUser = (state: RootState) => state.user.currentUser;


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
  currentUser: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  currentUser: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Handle loginUser success
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload.user;
        state.token = payload.accessToken;
      }
    );
    // Handle registerUser success
    builder.addMatcher(
      api.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload.user;
        state.token = payload.accessToken;
      }
    );
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.user.token;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
