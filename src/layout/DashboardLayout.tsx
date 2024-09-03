// src/components/Dashboard.tsx
import React from "react";
import { useSelector } from "react-redux";
import {
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useGetFacilitiesQuery,
} from "@/redux/api";
import { RootState } from "@/redux/store";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/userSlice";
import logo from "/resources/logo.png";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch data based on user role
  const { data: userBookings = [], isLoading: isUserBookingsLoading } =
    useGetUserBookingsQuery(user?.currentUser?._id || "", {
      skip: user?.currentUser?.role !== "user",
    });
  const { data: allBookings = [], isLoading: isAllBookingsLoading } =
    useGetAllBookingsQuery(undefined, {
      skip: user?.currentUser?.role !== "admin",
    });
  const { data: facilities = [], isLoading: isFacilitiesLoading } =
    useGetFacilitiesQuery(undefined, {
      skip: user?.currentUser?.role !== "admin",
    });

  if (!user) return <p>Loading...</p>;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center bg-slate-900 text-white px-6 py-3">
        <div className="flex justify-start">
          <Link to="/">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-7" />
              <p className="font-bold text-2xl">Sportly</p>
            </div>
          </Link>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="flex justify-end text-right flex-col gap-1">
            <span>{user?.currentUser?.name}</span>
            <span>{user?.currentUser?.email}</span>
          </div>
          <img src="" alt="" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* dashboard side bar */}

        <div className="p-6 w-full md:w-64 md:min-h-screen flex flex-row md:flex-col bg-slate-900 text-white text-xl font-semibold pt-20 text-left gap-3">
          <button onClick={handleLogout}>logout</button>
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {user?.currentUser?.name}
          </h1>

          {user?.currentUser?.role === "admin" ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
              <Link to='/dashboard/facilities'>All Facilities</Link>
              <section className="bg-gray-100 rounded-lg shadow-md mb-6">
                {/* Facility Management */}
                <div className="flex space-y-4 md:space-x-4 mb-4 md:mb-0 flex-row md:flex-col">
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
              <section className="bg-gray-100/10 p-4 rounded-lg shadow-md">
                <Link to="/dashboard/booking">
                  <h3 className="text-lg font-bold mb-2">My Bookings</h3>
                </Link>
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
        {/* dashboard content */}
        <div className="flex-1 bg-white text-black overflow-hidden m-5 shadow-xl rounded-lg min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
