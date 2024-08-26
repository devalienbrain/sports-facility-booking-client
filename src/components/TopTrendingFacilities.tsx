import React, { useEffect, useState } from "react";

// Mock data for trending facilities (replace this with API data in production)
const trendingFacilities = [
  {
    id: 1,
    name: "Elite Soccer Arena",
    location: "Brooklyn, NY",
    image: "/images/soccer-arena.jpg",
    rating: 4.8,
    bookings: 150,
  },
  {
    id: 2,
    name: "Downtown Basketball Court",
    location: "San Francisco, CA",
    image: "/images/basketball-court.jpg",
    rating: 4.7,
    bookings: 120,
  },
  {
    id: 3,
    name: "Oceanview Tennis Club",
    location: "Miami, FL",
    image: "/images/tennis-club.jpg",
    rating: 4.9,
    bookings: 200,
  },
  // Add more facilities as needed
];

const TopTrendingFacilities: React.FC = () => {
  const [facilities, setFacilities] = useState(trendingFacilities);

  useEffect(() => {
    // Fetch trending facilities from your API here
    // Example:
    // fetch('/api/trending-facilities')
    //   .then(response => response.json())
    //   .then(data => setFacilities(data))
    //   .catch(error => console.error('Error fetching trending facilities:', error));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Top Trending Facilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-gray-100 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {facility.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {facility.location}
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span className="text-gray-800 font-semibold">
                    {facility.rating}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({facility.bookings} bookings)
                  </span>
                </div>
                <a
                  href={`/facilities/${facility.id}`}
                  className="btn btn-primary w-full"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTrendingFacilities;
