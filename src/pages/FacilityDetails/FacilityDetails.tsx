import React from "react";

// Mock facility data (Replace with data fetching logic)
const mockFacility = {
  id: "1",
  name: "Soccer Field A",
  location: "City Center",
  pricePerHour: 50,
  description:
    "A high-quality soccer field located in the heart of the city, perfect for both amateur and professional matches.",
  images: [
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/400",
  ], // Replace with actual image URLs
};

const FacilityDetails = () => {
  const { name, location, pricePerHour, description, images } = mockFacility;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Facility Overview */}
      <div className="flex flex-col md:flex-row mb-10">
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="carousel">
            {images.map((image, index) => (
              <div key={index} className="carousel-item">
                <img
                  src={image}
                  alt={`Facility Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Facility Info */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="text-lg text-gray-700 mb-2">{location}</p>
          <p className="text-lg text-gray-800 mb-4">${pricePerHour} per hour</p>
          <p className="text-gray-700">{description}</p>
          <button className="btn btn-primary mt-4" onClick={navigateToBooking}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock navigate function (Replace with your router logic)
const navigateToBooking = () => {
  console.log("Navigating to booking page...");
};

export default FacilityDetails;
