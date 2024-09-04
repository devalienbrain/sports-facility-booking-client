// src/components/ManageBookings.tsx
import { useDeleteBookingMutation, useGetAllBookingsQuery } from "@/redux/api";
import React from "react";
import { Link } from "react-router-dom";

const ManageBookings: React.FC = () => {
  const {
    data: bookings,
    error,
    isLoading,
    refetch,
  } = useGetAllBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id).unwrap();
        alert("Booking deleted successfully");
        refetch();
      } catch (err) {
        console.error("Failed to delete booking:", err);
        alert("Failed to delete booking");
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading bookings</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <Link
          to="/bookings/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Booking
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Facility</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{booking.facilityName}</td>
                <td className="py-2 px-4 border-b">{booking.userName}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/bookings/edit/${booking._id}`}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="text-red-500"
                  >
                    Delete
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
