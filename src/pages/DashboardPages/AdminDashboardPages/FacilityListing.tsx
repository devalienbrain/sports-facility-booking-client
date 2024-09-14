import { useGetFacilitiesQuery } from "@/redux/api";
import React, { useState } from "react";

const FacilityListingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch facilities using the RTK Query hook
  const { data, isLoading, error } = useGetFacilitiesQuery("");
  // const facilities = Array.isArray(data) ? data : [];
  console.log({ data });
  console.log(data.data);
  const facilities = data?.data || [];
  // Filter facilities based on the search term
  const filteredFacilities = facilities.filter((facility: any) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Facilities
      </h1>
      <input
        type="text"
        placeholder="Search facilities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Show loading, error, or facilities */}
      {isLoading ? (
        <p>Loading facilities...</p>
      ) : error ? (
        <p>Failed to load facilities.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFacilities.map((facility: any) => (
            <div
              className="bg-white rounded-lg shadow-lg p-4"
              key={facility._id}
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
              <p className="text-gray-700 mb-2">{facility.description}</p>
              <p className="text-gray-900 font-bold mb-4">
                Price per hour: ${facility.pricePerHour}
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacilityListingPage;
