import {
  useUpdateFacilityMutation,
  useGetFacilityByIdQuery,
} from "@/redux/api";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFacility: React.FC = () => {
  const { id } = useParams(); // Get the facility ID from URL params
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerHour, setPricePerHour] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Add state for imageUrl
  const [updateFacility, { isLoading }] = useUpdateFacilityMutation();
  const { data: facility } = useGetFacilityByIdQuery(id!); // Fetch the facility details
  const navigate = useNavigate();
  console.log({ facility });

  // Populate form fields with facility data when the component mounts
  useEffect(() => {
    if (facility) {
      setName(facility.data.name);
      setLocation(facility.data.location);
      setPricePerHour(facility.data.pricePerHour);
      setDescription(facility.data.description);
      setImageUrl(facility.data.imageUrl); // Set the image URL if it exists
    }
  }, [facility]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateFacility({
        id: id!,
        facilityData: {
          name,
          location,
          pricePerHour,
          description,
          imageUrl,
        },
      }).unwrap(); // Pass the facility data to the mutation
      alert("Facility updated successfully");
      navigate("/dashboard/facilities");
    } catch (err) {
      console.error("Failed to update facility:", err);
      alert("Failed to update facility");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Facility</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-lime-800">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            defaultValue={facility?.name || ""}
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
            defaultValue={facility?.location || ""}
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
            defaultValue={facility?.pricePerHour || 0}
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
            defaultValue={facility?.description || ""}
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
            defaultValue={facility?.imageUrl || ""}
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Facility"}
        </button>
      </form>
    </div>
  );
};

export default UpdateFacility;
