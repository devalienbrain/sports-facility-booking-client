import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@/types/user.type";

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  // extraReducers: (builder) => {
  //   // Handle loginUser success
  //   builder.addMatcher(
  //     api.endpoints.loginUser.matchFulfilled,
  //     (state, { payload }) => {
  //       state.user = payload.user; // Update user
  //       state.token = payload.accessToken; // Update token
  //     }
  //   );
  //   // Handle registerUser success
  //   builder.addMatcher(
  //     api.endpoints.registerUser.matchFulfilled,
  //     (state, { payload }) => {
  //       state.user = payload.user; // Update user
  //       state.token = payload.accessToken; // Update token
  //     }
  //   );
  // },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
// export const useCurrentToken = (state: RootState) => state.user.token;
// export const selectCurrentUser = (state: RootState) => state.user.user;
