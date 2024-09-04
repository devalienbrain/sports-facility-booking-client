// src/components/AddFacility.tsx
import { useAddFacilityMutation } from "@/redux/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFacility: React.FC = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [addFacility, { isLoading }] = useAddFacilityMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFacility({ name, location }).unwrap();
      alert("Facility added successfully");
      navigate("/facility");
    } catch (err) {
      console.error("Failed to add facility:", err);
      alert("Failed to add facility");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Facility</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Facility"}
        </button>
      </form>
    </div>
  );
};

export default AddFacility;
