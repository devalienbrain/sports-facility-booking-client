// src/components/Dashboard.tsx
import React from "react";
import { RootState } from "../redux/store";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logout } from "../redux/features/userSlice";
import logo from "/resources/logo.png";
import { FaAd, FaHome, FaList, FaShoppingCart, FaUsers } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user);
  console.log(user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;
  const handleLogout = () => {
    dispatch(logout());
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
              <span className="font-semibold">{user?.user?.name}</span>
              <span>{user?.user?.email}</span>
            </div>
            <img src="" alt="" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* dashboard side bar */}
          <div className="bg-slate-100 text-slate-950 p-6 w-full md:w-64 flex flex-row md:flex-col text-xl font-semibold pt-20 text-left gap-3">
            <button onClick={handleLogout}>logout</button>
            <h1 className="text-2xl font-bold mb-4">
              Welcome, {user?.user?.name}
            </h1>

            {user?.user?.role === "admin" ? (
              <>
                <ul className="menu p-4">
                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <FaHome></FaHome>
                      Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/users">
                      <FaUsers></FaUsers>
                      All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/facilities">
                      <FaList></FaList>
                      All Facilities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/bookings">
                      <FaShoppingCart></FaShoppingCart>
                      All Bookings
                    </NavLink>
                  </li>

                  {/* shared nav links */}
                  <div className="divider"></div>
                  <li>
                    <NavLink to="/dashboard/addAPet">
                      <FaAd></FaAd>
                      <p className="hover:underline">Add a Facility</p>
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">User Dashboard</h2>
                <ul className="menu p-4">
                  <li>
                    <NavLink to="/dashboard/adminHome">
                      <FaHome></FaHome>
                      user Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/bookings">
                      <FaShoppingCart></FaShoppingCart>
                      My Bookings
                    </NavLink>
                  </li>

                  {/* shared nav links */}
                  <div className="divider"></div>
                  <li>
                    <NavLink to="/dashboard/addAPet">
                      <FaAd></FaAd>
                      <p className="hover:underline">Book a Facility</p>
                    </NavLink>
                  </li>
                </ul>
              </>
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
