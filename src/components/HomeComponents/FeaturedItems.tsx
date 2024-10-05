import { useGetFacilitiesQuery } from "@/redux/api";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedItems: React.FC = () => {
  const { data, isLoading, error } = useGetFacilitiesQuery();

  let facilities = data?.data || [];
  // let facilities = (data?.data || []) as TFacilities;
  if (facilities.length > 0) {
    facilities = [...facilities] // Create a shallow copy of the array
      .sort(() => 0.5 - Math.random()) // Shuffle the array randomly
      .slice(0, 3); // Select the first 3 items
  }

  return (
    <div id="featuredItems" className="text-center">
      <h1 className="text-5xl font-black text-center mb-8">
        Featured <span className="text-blue-800">Facilities</span>
      </h1>

      {isLoading ? (
        <p>Loading featured facilities...</p>
      ) : error ? (
        <p>Failed to load facilities.</p>
      ) : facilities.length === 0 ? (
        <p>No facilities available.</p> // Show this if no facilities are available
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {facilities.map((facility: any) => (
            <div key={facility._id} className="card bg-black/50 p-3">
              <figure>
                <img
                  src={facility.imageUrl} // Use imageUrl field
                  alt={facility.name}
                  className="w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-center justify-center font-black text-xl">
                  {facility.name}
                </h2>
                <p className="text-sm font-light">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/facilities-list">
        <div className="flex justify-center items-center gap-2 hover:underline text-xs font-semibold py-3 px-6 rounded-3xl shadow-lg text-slate-500">
          <FaArrowAltCircleRight /> Click To Browse More And Book Facilities
        </div>
      </Link>
    </div>
  );
};

export default FeaturedItems;
