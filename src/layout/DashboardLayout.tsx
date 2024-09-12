import React from "react";
import { RootState } from "../redux/store";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/features/userSlice";
import logo from "/resources/logo.png";
import {
  FaAd,
  FaHome,
  FaList,
  FaQuidditch,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useGetAllBookingsQuery } from "../redux/api"; // API call for fetching all bookings

const AdminDashboard: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: bookings = [], isLoading } = useGetAllBookingsQuery(); // Fetch all bookings
  console.log({ bookings });
  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken"); // Clear token on logout
    navigate("/");
  };

  return (
    <>
      <div className="bg-white text-black h-screen flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center shadow-lg bg-slate-900 text-white px-6 py-4">
          <div className="flex justify-start">
            <NavLink to="/">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-7" />
                <p className="font-black text-2xl">Sportly</p>
              </div>
            </NavLink>
          </div>

          <div className="flex justify-end items-center gap-2">
            <div className="flex justify-end text-right flex-col gap-1 text-xs">
              <span className="font-semibold">{user?.name}</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Sidebar and Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="bg-slate-100 text-slate-950 p-6 w-full md:w-64 flex flex-col text-xl font-semibold text-left gap-3">
            <ul className="menu p-4">
              <li>
                <div>
                  <FaHome />
                  {user?.role === "admin" ? "Admin" : "User"} Home
                </div>
              </li>
            </ul>
            {user?.role === "admin" ? (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/facilities">
                    <FaList />
                    All Facilities
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaShoppingCart />
                    All Bookings
                  </NavLink>
                </li>
                <div className="divider"></div>
                <li>
                  <NavLink to="/dashboard/addFacility">
                    <FaAd />
                    Add a Facility
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register">
                    <FaUsers />
                    Create An Admin
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaShoppingCart />
                    My Bookings
                  </NavLink>
                </li>
                <div className="divider"></div>

                <li>
                  <NavLink to="/dashboard/bookAFacility">
                    <FaShoppingCart />
                    Book A Facility
                  </NavLink>
                </li>
              </ul>
            )}
            <ul className="menu p-4">
              <li>
                <div>
                  <MdLogout />
                  <span onClick={handleLogout} className="hover:text-red-600">
                    Logout
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white text-black p-6 h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
