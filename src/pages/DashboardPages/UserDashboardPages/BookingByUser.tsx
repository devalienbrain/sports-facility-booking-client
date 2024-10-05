import React from "react";
import { useDeleteBookingMutation, useGetUserBookingsQuery } from "@/redux/api";
import { TBooking } from "@/types/booking.type";
import { useAppSelector } from "@/redux/hook";
import { Link } from "react-router-dom";

const BookingByUser: React.FC = () => {
  const { _id: userId } = useAppSelector((state) => state.user.user);
  const { data: bookings, error, isLoading } = useGetUserBookingsQuery(userId);
  const [deleteBooking] = useDeleteBookingMutation();

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId).unwrap();
      alert("Booking cancelled successfully.");
    } catch (error) {
      alert("Error canceling booking.");
    }
  };

  // Calculate total payable amount
  const totalPayableAmount =
    bookings?.data?.reduce((total: number, booking: TBooking) => {
      return total + booking.payableAmount;
    }, 0) || 0;

  if (isLoading)
    return <div className="text-center text-gray-600">Loading bookings...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error loading bookings.</div>
    );

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Bookings</h2>

      {/* Display Total Payable Amount */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-xl font-semibold text-gray-700">
          Total Payable Amount:{" "}
          <span className="font-bold text-green-600">
            ${totalPayableAmount}
          </span>
        </p>
      </div>

      {bookings && bookings?.data?.length > 0 ? (
        <ul className="space-y-4">
          {bookings.data.map((booking: TBooking, index: number) => (
            <li
              key={booking._id}
              className="border border-gray-300 p-6 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-700">
                  #{index + 1}
                </p>
                <p className="text-gray-600 mt-1">
                  Facility:{" "}
                  <span className="font-extrabold">
                    {booking.facility.name}
                  </span>
                </p>
                <p className="text-gray-600 mt-1">
                  Date:{" "}
                  <span className="font-semibold">
                    {new Date(booking.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-600 mt-1">
                  Time:{" "}
                  <span className="font-semibold">
                    {new Date(booking.startTime).toLocaleTimeString()} -{" "}
                    {new Date(booking.endTime).toLocaleTimeString()}
                  </span>
                </p>
                <p className="text-gray-600 mt-1">
                  Payable Amount:{" "}
                  <span className="font-bold">${booking.payableAmount}</span>
                </p>
              </div>
              <button
                className="ml-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-red-600">You have no bookings.</p>
      )}

      {/* Proceed to Payment Button */}
      {totalPayableAmount > 0 && (
        <Link to="/dashboard/checkoutForPayment">
          <div className="mt-6 text-center">
            <button className="px-6 py-3 rounded-3xl shadow-xl text-white bg-blue-500 hover:bg-blue-600 font-semibold">
              Proceed to Payment
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default BookingByUser;

