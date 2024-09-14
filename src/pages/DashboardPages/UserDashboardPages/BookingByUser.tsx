import React from "react";
import { useDeleteBookingMutation, useGetUserBookingsQuery } from "@/redux/api"; // Import the hooks
import { TBooking } from "@/types/booking.type"; // Assuming you have defined a booking type
import { useAppSelector } from "@/redux/hook";

const BookingByUser: React.FC = () => {
  const { _id: userId } = useAppSelector((state) => state.user.user); // Get the current user ID
  console.log({ userId });
  // Fetch user bookings by passing the userId
  const { data: bookings, error, isLoading } = useGetUserBookingsQuery(userId); // Pass userId here
  console.log({ bookings });
  // Handle booking cancellation
  const [deleteBooking] = useDeleteBookingMutation();

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId).unwrap();
      alert("Booking cancelled successfully.");
    } catch (error) {
      alert("Error canceling booking.");
    }
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings.</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      {bookings && bookings?.data?.length > 0 ? (
        <ul>
          {bookings.data.map((booking: TBooking) => (
            <li key={booking._id} className="border p-4 mb-4">
              <p>Facility: {booking.facility.name}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>
                Time: {new Date(booking.startTime).toLocaleTimeString()} -{" "}
                {new Date(booking.endTime).toLocaleTimeString()}
              </p>
              <button
                className="text-red-500"
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no bookings.</p>
      )}
    </div>
  );
};

export default BookingByUser;
