import React from "react";
import { RootState } from "../redux/store";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/features/authSlice";
import logo from "/resources/logo.png";
import {
  FaAd,
  FaHome,
  FaList,
  FaPaypal,
  FaShoppingCart,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const DashboardLayout: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken"); // Clear token on logout
    navigate("/");
  };

  return (
    <div className="bg-white text-black h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center shadow-xl px-6 py-3 bg-slate-50">
        <NavLink to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-7" />
            <p className="font-black text-2xl">Sportly</p>
          </div>
        </NavLink>
        <div className="flex items-center gap-2">
          <img
            src={user?.photoUrl}
            className="w-8 rounded-full"
            alt="User Photo"
          />
          <div className="flex flex-col text-xs">
            <span className="font-bold text-sm">{user?.name}</span>
            <span className="text-xs">{user?.email}</span>
          </div>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-scroll md:overflow-hidden">
        {/* Sidebar for larger devices */}
        <div className="hidden md:flex md:flex-col bg-slate-50 text-slate-950 p-6 w-64 text-xl font-semibold gap-3 shadow-xl">
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard">
                <FaHome /> {user?.role === "admin" ? "Admin" : "User"} Home
              </NavLink>
            </li>
            {user?.role === "admin" ? (
              <>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaShoppingCart /> All Bookings
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/facilities">
                    <FaList /> All Facilities
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/addFacility">
                    <FaAd /> Add a Facility
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUser /> All User
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/register">
                    <FaUsers /> Create An Admin
                  </NavLink>
                </li>
                <hr />
                <li>
                  <NavLink to="/dashboard/checkoutForPayment">
                    <FaPaypal /> Payment
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/userBookings">
                    <FaShoppingCart /> My Bookings
                  </NavLink>
                </li>
                <hr />
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/checkoutForPayment">
                    <FaPaypal /> Payment
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/userBookings">
                    <FaShoppingCart /> My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/facilities-list">
                    <FaShoppingCart /> Book A Facility
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <div
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer hover:text-red-600"
              >
                <MdLogout />
                Logout
              </div>
            </li>
          </ul>
        </div>

        {/* Sidebar for small devices */}
        <div className="flex md:hidden bg-slate-100 text-slate-950 p-3 w-full text-sm font-semibold flex-row items-center justify-around">
          <NavLink to="/dashboard">
            <FaHome className="text-xl" />
          </NavLink>
          {user?.role === "admin" ? (
            <>
              <NavLink to="/dashboard/facilities">
                <FaList className="text-xl" />
              </NavLink>
              <NavLink to="/dashboard/bookings">
                <FaShoppingCart className="text-xl" />
              </NavLink>
              <NavLink to="/dashboard/addFacility">
                <FaAd className="text-xl" />
              </NavLink>
              <NavLink to="/register">
                <FaUsers className="text-xl" />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard/bookings">
                <FaShoppingCart className="text-xl" />
              </NavLink>
              <NavLink to="/dashboard/bookAFacility">
                <FaShoppingCart className="text-xl" />
              </NavLink>
            </>
          )}
          <div
            onClick={handleLogout}
            className="cursor-pointer hover:text-red-600"
          >
            <MdLogout className="text-xl" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white text-black p-6 h-full md:h-auto overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
