import React, { useState, useEffect } from "react";

// Mock data for facilities (Replace with your data fetching logic)
const mockFacilities = [
  {
    id: "1",
    name: "Soccer Field A",
    location: "City Center",
    pricePerHour: 50,
    image: "https://via.placeholder.com/300",
    isDeleted: false,
  },
  {
    id: "2",
    name: "Basketball Court B",
    location: "Suburban Area",
    pricePerHour: 30,
    image: "https://via.placeholder.com/300",
    isDeleted: false,
  },
  // Add more facilities as needed
];

const FacilityListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrice, setFilterPrice] = useState<number | "">("");
  const [filteredFacilities, setFilteredFacilities] = useState(mockFacilities);

  useEffect(() => {
    // Filter facilities based on search query and price filter
    const results = mockFacilities.filter(
      (facility) =>
        !facility.isDeleted &&
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterPrice === "" || facility.pricePerHour <= filterPrice)
    );
    setFilteredFacilities(results);
  }, [searchQuery, filterPrice]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <input
          type="text"
          placeholder="Search by facility name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs mb-4 md:mb-0 md:mr-4"
        />
        <input
          type="number"
          placeholder="Filter by price"
          value={filterPrice}
          onChange={(e) => setFilterPrice(Number(e.target.value))}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility) => (
          <div key={facility.id} className="card shadow-lg">
            <figure>
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{facility.name}</h2>
              <p className="text-sm text-gray-600">{facility.location}</p>
              <p className="text-sm text-gray-800">
                ${facility.pricePerHour} per hour
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToDetails(facility.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock navigate function (Replace with your router logic)
const navigateToDetails = (id: string) => {
  console.log(`Navigating to details page for facility with ID: ${id}`);
};

export default FacilityListing;
