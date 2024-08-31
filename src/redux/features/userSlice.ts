// import { TUser } from "@/types/user.type";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   currentUser: TUser | null;
//   status: "idle" | "loading" | "failed";
// }

// const initialState: UserState = {
//   currentUser: null,
//   status: "idle",
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<TUser>) {
//       state.currentUser = action.payload;
//     },
//     clearUser(state) {
//       state.currentUser = null;
//     },
//     // logout: (state) => {
//     //   state.currentUser = null;
//     //   state.user.token = null;
//     // },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  currentUser: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  currentUser: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      // const { user, token } = action.payload;
      state.currentUser = action.payload;
      // state.token = token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;

export const useCurrentToken = (state: RootState) => state.user.token;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
