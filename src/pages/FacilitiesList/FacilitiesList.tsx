import Footer from "@/components/HomeComponents/Footer";
import Navbar from "@/components/HomeComponents/Navbar";
import { useGetFacilitiesQuery } from "@/redux/api";
import { TFacility } from "@/types/facility.type";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FacilityListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrice, setFilterPrice] = useState<number | "">("");

  const { data, isLoading, error } = useGetFacilitiesQuery("");
  const facilities = data?.data || [];
  const [filteredFacilities, setFilteredFacilities] = useState<TFacility[]>(facilities);

  const navigate = useNavigate();

  useEffect(() => {
    if (facilities.length) {
      const results = facilities.filter(
        (facility: TFacility) =>
          !facility.isDeleted &&
          facility.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (filterPrice === "" || facility.pricePerHour <= filterPrice)
      );
      setFilteredFacilities(results);
    }
  }, [searchQuery, filterPrice, facilities]);

  if (isLoading) return <div>Loading facilities...</div>;
  if (error) return <div>Error fetching facilities.</div>;

  return (
    <>
      <Navbar />
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
            onChange={(e) => setFilterPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map((facility: TFacility) => (
              <div key={facility.name} className="card shadow-lg">
                <figure>
                  <img
                    src={facility.imageUrl}
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
                      onClick={() => navigate(`/api/facility/${facility._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No facilities found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FacilityListing;
