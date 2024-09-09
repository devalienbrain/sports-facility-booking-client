import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { TBooking } from "@/types/booking.type";
// import { api } from "./api";

// Define the initial state for the bookings
export interface BookingState {
  bookings: TBooking[];
  status: "idle" | "loading" | "failed";
}

const initialState: BookingState = {
  bookings: [],
  status: "idle",
};

// Create a slice for bookings
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings(state, action: PayloadAction<TBooking[]>) {
      state.bookings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading state for fetching all bookings
      .addMatcher(api.endpoints.getAllBookings.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
        api.endpoints.getAllBookings.matchFulfilled,
        (state, action) => {
          state.status = "idle";
          state.bookings = action.payload;
        }
      )
      .addMatcher(api.endpoints.getAllBookings.matchRejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export actions and reducer
export const { setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
