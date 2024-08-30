import { TFacility } from "@/types/facility.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FacilityState {
  facilities: TFacility[];
  status: "idle" | "loading" | "failed";
}

const initialState: FacilityState = {
  facilities: [],
  status: "idle",
};

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setFacilities(state, action: PayloadAction<TFacility[]>) {
      state.facilities = action.payload;
    },
  },
});

export const { setFacilities } = facilitySlice.actions;
export default facilitySlice.reducer;
