import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { TUser, TUsersResponse } from "@/types/user.type";
import { TFacilities, TFacility } from "@/types/facility.type";
import { TBooking, TBookings } from "@/types/booking.type";

// Define the base API service
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000",
    baseUrl: "https://sports-facility-booking-server-vert.vercel.app",
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
    loginUser: builder.mutation<{
      statusCode: number;
      success: boolean;
      token: string;
      message: string;
      data: TUser; // Assuming TUser is your user data type
    }, {
      email: string;
      password: string;
    }>({
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
    getFacilities: builder.query<TFacilities, void>({
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
    getAllUsers: builder.query<TUsersResponse, void>({
      query: () => "/users",
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),
    updateUserRole: builder.mutation<any, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/api/users/${id}/role`,
        method: "PUT",
        body: { role },
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
    getAllBookings: builder.query<TBookings, void>({
      query: () => "/api/bookings",
    }),
    getUserBookings: builder.query<TBookings, string>({
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
  useUpdateUserRoleMutation,
  useAddAdminMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useCheckAvailabilityQuery,
  useCreteOrderMutation,
} = api;
