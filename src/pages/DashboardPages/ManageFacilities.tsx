// src/components/ManageFacilities.tsx
import { useDeleteFacilityMutation, useGetFacilitiesQuery } from '@/redux/api';
import React from 'react';
import { Link } from 'react-router-dom';

const ManageFacilities: React.FC = () => {
  const { data: facilities, error, isLoading, refetch } = useGetFacilitiesQuery();
  const [deleteFacility] = useDeleteFacilityMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      try {
        await deleteFacility(id).unwrap();
        alert('Facility deleted successfully');
        refetch();
      } catch (err) {
        console.error('Failed to delete facility:', err);
        alert('Failed to delete facility');
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading facilities</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Facilities</h1>
        <Link to="/dashboard/facility/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Facility
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities && facilities?.data?.map((facility) => (
            <tr key={facility._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{facility.name}</td>
              <td className="py-2 px-4 border-b">{facility.location}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/facility/edit/${facility._id}`} className="text-blue-500 mr-4">Edit</Link>
                <button onClick={() => handleDelete(facility._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFacilities;
