// src/components/ManageFacilities.tsx
import { useDeleteFacilityMutation, useGetFacilitiesQuery } from "@/redux/api";
import React from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const ManageFacilities: React.FC = () => {
  const {
    data: facilities,
    error,
    isLoading,
    refetch,
  } = useGetFacilitiesQuery();
  const [deleteFacility] = useDeleteFacilityMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        await deleteFacility(id).unwrap();
        alert("Facility deleted successfully");
        refetch();
      } catch (err) {
        console.error("Failed to delete facility:", err);
        alert("Failed to delete facility");
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error loading facilities</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Manage Facilities</h1>
        <Link
          to="/dashboard/facility/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition duration-300"
        >
          Add Facility
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-5 text-left">#</th>
            <th className="py-3 px-5 text-left">Name</th>
            <th className="py-3 px-5 text-left">Location</th>
            <th className="py-3 px-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities &&
            facilities?.data?.map((facility, index) => (
              <tr
                key={facility._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-5 border-b text-sm font-medium text-gray-700">
                  {index + 1}
                </td>
                <td className="py-3 px-5 border-b text-sm font-semibold text-gray-800">
                  {facility.name}
                </td>
                <td className="py-3 px-5 border-b text-sm text-gray-600">
                  {facility.location}
                </td>
                <td className="py-3 px-5 border-b flex justify-end items-center space-x-4">
                  <Link
                    to={`/dashboard/updateFacility/${facility._id}`}
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    <FaRegEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(facility._id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    <TiDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFacilities;
