import { useAppSelector } from "../../redux/hook";
import React from "react";
import { useNavigate } from "react-router-dom";
import profilePictureUrl from "../../../public/resources/alienDev.jpg";

const AdminHome: React.FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-xl p-8 text-center">
        {/* Profile Picture */}
        <img
          src={profilePictureUrl}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300 object-cover"
        />

        {/* Welcome message */}
        <h1 className="text-2xl font-bold text-black mb-4">
          Welcome, {user?.name}!
        </h1>

        {/* User Info */}
        <p className="text-gray-600 mb-4">
          Role: <span className="font-semibold capitalize">{user?.role}</span>
        </p>

        <div className="space-y-2">
          <p className="text-gray-600">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {user?.phone}
          </p>
          <p className="text-gray-600">
            <strong>Address:</strong> {user?.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
