
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { TBooking, TBookings } from "@/types/booking.type"; // Import TBookings as well

// Define the initial state for the bookings
export interface BookingState {
  bookings: TBooking[]; // Array of TBooking
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
      state.bookings = action.payload; // action.payload should be TBooking[]
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading state for fetching all bookings
      .addMatcher(api.endpoints.getAllBookings.matchPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(api.endpoints.getAllBookings.matchFulfilled, (state, action: PayloadAction<TBookings>) => {
        state.status = "idle";
        state.bookings = action.payload.data; // Now correctly assigning from action.payload.data
      })
      .addMatcher(api.endpoints.getAllBookings.matchRejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export actions and reducer
export const { setBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
