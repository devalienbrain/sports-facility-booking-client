import { useAddFacilityMutation } from "@/redux/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFacility: React.FC = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerHour, setPricePerHour] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Add state for imageUrl
  const [addFacility, { isLoading }] = useAddFacilityMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFacility({
        name,
        location,
        pricePerHour,
        description,
        imageUrl,
      }).unwrap(); // Pass imageUrl
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
      <form onSubmit={handleSubmit} className="space-y-4 text-red-600">
        {/* Name */}
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

        {/* Location */}
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

        {/* Price per Hour */}
        <div>
          <label className="block text-sm font-medium">Price Per Hour</label>
          <input
            type="number"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(Number(e.target.value))}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} // Add input for imageUrl
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
