import { useDeleteBookingMutation, useGetAllBookingsQuery } from "@/redux/api";
import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TBooking } from "@/types/booking.type";

const ManageBookings: React.FC = () => {
  const {
    data: bookings,
    error,
    isLoading,
    refetch,
  } = useGetAllBookingsQuery();

  const [deleteBooking] = useDeleteBookingMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await deleteBooking(id).unwrap();
        alert("Booking canceled successfully");
        refetch(); // Refetch after deletion to update the list
      } catch (err) {
        console.error("Failed to cancel booking:", err);
        alert("Failed to cancel booking");
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) {
    console.log(error);
    return <div className="p-4 text-red-500">Error loading bookings</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <Link
          to="/bookings/add"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Add Booking
        </Link>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-sm uppercase font-semibold text-gray-600">
            <th className="py-3 px-6">S.No</th>
            <th className="py-3 px-6">Facility</th>
            <th className="py-3 px-6">User</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings?.data.map((booking: TBooking, index) => (
              <tr
                key={booking._id}
                className="hover:bg-gray-100 transition-all"
              >
                <td className="py-3 px-6 border-b">{index + 1}</td>
                <td className="py-3 px-6 border-b">
                  <div>
                    <p className="font-bold">{booking?.facility?.name}</p>
                    <p className="text-sm text-gray-500">
                      Price per hour: {booking?.facility?.pricePerHour}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-6 border-b">
                  <div>
                    <p className="font-semibold">{booking?.user?.name}</p>
                    <p className="text-sm text-gray-500">
                      {booking?.user?.email}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-6 border-b">
                  {new Date(booking?.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 border-b flex items-center space-x-4">
                  <Link
                    to="/dashboard/updateFacility"
                    className="text-blue-500 hover:text-blue-700"
                    title="Change Booking"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Cancel Booking"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
