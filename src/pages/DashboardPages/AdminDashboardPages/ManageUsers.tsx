import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/api";
import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaUserShield } from "react-icons/fa";
import { TUser } from "@/types/user.type"; // Import your types

const ManageUsers: React.FC = () => {
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  console.log({ users });

  const allUsers: TUser[] = users?.data || [];
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

  const handleAdminToggle = async (id: string, isAdmin: boolean) => {
    if (
      window.confirm(
        `Are you sure you want to ${isAdmin ? "remove admin" : "make admin"}?`
      )
    ) {
      try {
          
        await updateUserRole({ id, role: isAdmin ? "user" : "admin" }).unwrap();
        alert(`Admin status ${isAdmin ? "removed" : "granted"} successfully`);
        refetch();
      } catch (err) {
        console.error("Failed to update user role:", err);
        alert("Failed to update user role");
      }
    }
  };
  

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">
        Error loading users: {error.message}
      </div>
    );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <Link
          to="/users/add"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          Add User
        </Link>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left text-sm uppercase font-semibold text-gray-600">
            <th className="py-3 px-6">S.No</th>
            <th className="py-3 px-6">Profile</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user: TUser, index: number) => (
            <tr key={user._id} className="hover:bg-gray-100 transition-all">
              <td className="py-3 px-6 border-b">{index + 1}</td>
              <td className="py-3 px-6 border-b text-sm">
                <img
                  src={user.photoUrl}
                  alt="User Profile"
                  className="w-7 rounded-full"
                />
              </td>
              <td className="py-3 px-6 border-b font-semibold">{user.name}</td>
              <td className="py-3 px-6 border-b text-sm">{user.email}</td>
              <td className="py-3 px-6 border-b capitalize font-bold text-sm">
                {user.role}
              </td>
              <td className="py-3 px-6 border-b flex items-center space-x-4">
                <button
                  onClick={() =>
                    handleAdminToggle(user._id, user.role === "admin")
                  }
                  className={`text-yellow-500 hover:text-yellow-600 ${
                    user.role === "admin" ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <FaUserShield size={20} />
                </button>
                <Link
                  to={`/users/edit/${user._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={20} />
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
