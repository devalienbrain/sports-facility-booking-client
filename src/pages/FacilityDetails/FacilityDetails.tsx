import { useParams } from "react-router-dom";
import Footer from "@/components/HomeComponents/Footer";
import Navbar from "@/components/HomeComponents/Navbar";
import { useGetFacilityByIdQuery } from "@/redux/api";
import { useNavigate } from "react-router-dom";

const FacilityDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { data: facility, isLoading, error } = useGetFacilityByIdQuery(id!);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading facility details...</div>;
  if (error || !facility) return <div>Error fetching facility details.</div>;

  const { name, location, pricePerHour, description, imageUrl } = facility.data;
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {/* Facility Overview */}
        <div className="flex flex-col md:flex-row mb-10">
          {/* Images */}
          <div className="w-full md:w-1/2">
            <div className="carousel">
              <div className="carousel-item">
                <img
                  src={imageUrl}
                  alt="Facility Image"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Facility Info */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4">{name}</h2>
            <p className="text-lg text-gray-700 mb-2">{location}</p>
            <p className="text-lg text-gray-800 mb-4">
              ${pricePerHour} per hour
            </p>
            <p className="text-gray-700">{description}</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate(`/facility-booking/${id}`)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FacilityDetails;
