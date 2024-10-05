import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { TUser } from "@/types/user.type";
import { TFacility } from "@/types/facility.type";
import { TBooking } from "@/types/booking.type";

// Define the base API service
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000",
    baseUrl: "https://sports-facility-booking-server-vert.vercel.app/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // User Authentication
    loginUser: builder.mutation<
      {
        accessToken: string;
        user: TUser;
      },
      {
        email: string;
        password: string;
      }
    >({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<
      {
        accessToken: string;
        user: TUser;
      },
      any
    >({
      query: (userData) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    // Facility Management
    getFacilities: builder.query<any[], void>({
      query: () => "/api/facility",
    }),
    getFacilityById: builder.query<any, string>({
      query: (id) => `/api/facility/${id}`,
    }),
    addFacility: builder.mutation<any, any>({
      query: (facilityData) => ({
        url: "/api/facility",
        method: "POST",
        body: facilityData,
      }),
    }),
    updateFacility: builder.mutation<
      any,
      {
        id: string;
        facilityData: TFacility;
      }
    >({
      query: ({ id, facilityData }) => ({
        url: `/api/facility/${id}`,
        method: "PUT",
        body: facilityData,
      }),
    }),
    deleteFacility: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/facility/${id}`,
        method: "DELETE",
      }),
    }),

    // User Management
    getAllUsers: builder.query<any[], void>({
      query: () => "/api/users",
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation<
      any,
      {
        id: string;
        userData: TUser;
      }
    >({
      query: ({ id, userData }) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    addAdmin: builder.mutation<any, any>({
      query: (adminData) => ({
        url: "/api/users/admin",
        method: "POST",
        body: adminData,
      }),
    }),

    // Booking Management
    getAllBookings: builder.query<any[], void>({
      query: () => "/api/bookings",
    }),
    getUserBookings: builder.query<any[], string>({
      query: (userId) => `/api/bookings/user/${userId}`, // Pass userId to the API
    }),

    createBooking: builder.mutation<any, any>({
      query: (bookingData) => ({
        url: "/api/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),
    updateBooking: builder.mutation<
      any,
      {
        id: string;
        bookingData: TBooking;
      }
    >({
      query: ({ id, bookingData }) => ({
        url: `/api/bookings/${id}`,
        method: "PUT",
        body: bookingData,
      }),
    }),
    deleteBooking: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/bookings/${id}`,
        method: "DELETE",
      }),
    }),

    // Payment
    creteOrder: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/api/order/create`,
          body: data,
        };
      },
    }),

    // Check Booking Availability
    checkAvailability: builder.query<
      any,
      {
        date: string;
        facilityId: string;
      }
    >({
      query: ({ date, facilityId }) =>
        `/api/check-availability?date=${date}&facility=${facilityId}`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetFacilitiesQuery,
  useGetFacilityByIdQuery,
  useAddFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAddAdminMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useCheckAvailabilityQuery,
  useCreteOrderMutation,
} = api;
