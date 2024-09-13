import { useGetFacilitiesQuery } from "@/redux/api";
import React from "react";

const FeaturedItems: React.FC = () => {
  const { data, isLoading, error } = useGetFacilitiesQuery("");
  const facilities = data?.data || [];

  return (
    <div className="text-center">
      <h1 className="text-5xl font-black text-center mb-8">
        Featured Facilities
      </h1>

      {isLoading ? (
        <p>Loading featured facilities...</p>
      ) : error ? (
        <p>Failed to load facilities.</p>
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
    </div>
  );
};

export default FeaturedItems;
