import { TUser } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  currentUser: TUser | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
