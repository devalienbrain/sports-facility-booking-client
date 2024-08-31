import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API service
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }), 
  endpoints: (builder) => ({
    // User Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Register User
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    // Fetch Facilities
    getFacilities: builder.query({
      query: () => "/api/facility",
    }),
    // Fetch Single Facility Details
    getFacilityById: builder.query({
      query: (id) => `/api/facility/${id}`,
    }),
    // Check Booking Availability
    checkAvailability: builder.query({
      query: ({ date, facility }) =>
        `/api/check-availability?date=${date}&facility=${facility}`,
    }),
    // Create Booking
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/api/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),
    // Fetch User Bookings
    getUserBookings: builder.query({
      query: (userId) => `/api/bookings/user/${userId}`,
    }),
    // Fetch All Bookings (Admin)
    getAllBookings: builder.query({
      query: () => "/api/bookings",
    }),
    // Manage Facilities (Admin)
    addFacility: builder.mutation({
      query: (facilityData) => ({
        url: "/api/facility",
        method: "POST",
        body: facilityData,
      }),
    }),
    updateFacility: builder.mutation({
      query: ({ id, facilityData }) => ({
        url: `/api/facility/${id}`,
        method: "PUT",
        body: facilityData,
      }),
    }),
    deleteFacility: builder.mutation({
      query: (id) => ({
        url: `/api/facility/${id}`,
        method: "DELETE",
      }),
    }),
    // Admin Operations
    addAdmin: builder.mutation({
      query: (adminData) => ({
        url: "/api/users/admin",
        method: "POST",
        body: adminData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetFacilitiesQuery,
  useGetFacilityByIdQuery,
  useCheckAvailabilityQuery,
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetAllBookingsQuery,
  useAddFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useAddAdminMutation,
} = api;
