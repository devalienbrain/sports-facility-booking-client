import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Make sure to import the correct path to your store
import {
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useGetFacilitiesQuery,
} from "@/redux/api"; // Adjust the path if necessary

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Fetch data based on user role
  const { data: userBookings = [], isLoading: isUserBookingsLoading } =
    useGetUserBookingsQuery(user?.id, {
      skip: user?.role !== "user",
    });
  const { data: allBookings = [], isLoading: isAllBookingsLoading } =
    useGetAllBookingsQuery(undefined, {
      skip: user?.role !== "admin",
    });
  const { data: facilities = [], isLoading: isFacilitiesLoading } =
    useGetFacilitiesQuery(undefined, {
      skip: user?.role !== "admin",
    });

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

      {user.role === "admin" ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
          <section className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            {/* Facility Management */}
            <div className="flex space-x-4 mb-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Facility
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Edit Facility
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete Facility
              </button>
            </div>
            {/* Booking Management */}
            <h3 className="text-lg font-bold mb-2">All Bookings</h3>
            {isAllBookingsLoading ? (
              <p>Loading bookings...</p>
            ) : (
              <ul className="list-disc list-inside">
                {allBookings.map((booking: any) => (
                  <li key={booking.id} className="text-gray-800">
                    {booking.facility.name} - {booking.date}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">User Dashboard</h2>
          <section className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">My Bookings</h3>
            {isUserBookingsLoading ? (
              <p>Loading your bookings...</p>
            ) : (
              <ul className="list-disc list-inside">
                {userBookings.map((booking: any) => (
                  <li key={booking.id} className="text-gray-800">
                    {booking.facility.name} - {booking.date}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
