// src/components/ManageUsers.tsx
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/api";
import React from "react";
import { Link } from "react-router-dom";

const ManageUsers: React.FC = () => {
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  console.log({ users });
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        alert("User deleted successfully");
        refetch();
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Failed to delete user");
      }
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading users</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <Link
          to="/users/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/users/edit/${user._id}`}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
