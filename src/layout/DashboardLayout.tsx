import React from "react";
import { RootState } from "../redux/store";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/features/userSlice";
import logo from "/resources/logo.png";
import { FaAd, FaHome, FaList, FaShoppingCart, FaUsers } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken"); // Clear token on logout
    navigate("/");
  };

  return (
    <>
      <div className="bg-white text-black">
        {/* navbar */}
        <div className="flex justify-between items-center shadow-lg bg-slate-900 text-white px-6 py-2">
          <div className="flex justify-start">
            <Link to="/">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-7" />
                <p className="font-bold text-2xl">Sportly</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-end items-center gap-2">
            <div className="flex justify-end text-right flex-col gap-1 text-xs">
              <span className="font-semibold">{user?.name}</span>
              <span>{user?.email}</span>
            </div>
            <img src="" alt="" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* dashboard side bar */}
          <div className="bg-slate-100 text-slate-950 p-6 w-full md:w-64 flex flex-row md:flex-col text-xl font-semibold pt-20 text-left gap-3">
            <button onClick={handleLogout}>Logout</button>
            <h1 className="text-2xl font-bold mb-4">
              Welcome, {user?.name}
            </h1>

            {user?.role === "admin" ? (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome />
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
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
              </ul>
            ) : (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaHome />
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaShoppingCart />
                    My Bookings
                  </NavLink>
                </li>
                <div className="divider"></div>
                <li>
                  <NavLink to="/dashboard/bookFacility">
                    <FaAd />
                    Book a Facility
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          {/* dashboard content */}
          <div className="flex-1 bg-white text-black">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
