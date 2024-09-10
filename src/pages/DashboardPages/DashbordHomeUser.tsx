import { useAppSelector } from "../../redux/hook";
import React from "react";
import profilePictureUrl from "../../../public/resources/alienDev.jpg";

const DashbordHomeUser: React.FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <div className="flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-md rounded-xl p-8 text-center">
        {/* Profile Picture */}
        <img
          src={profilePictureUrl}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300 object-cover"
        />

        {/* Welcome message */}
        <h1 className="text-2xl font-bold text-black mb-4">
          Welcome, <span className="font-black"> {user?.name}!</span>
        </h1>

        {/* User Info */}
        <p className="text-gray-600 mb-4">
          Role: <span className="font-bold capitalize">{user?.role}</span>
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

export default DashbordHomeUser;
