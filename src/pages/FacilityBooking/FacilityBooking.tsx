import { useParams } from "react-router-dom"; // Get the facility ID from the URL
import Footer from "@/components/HomeComponents/Footer";
import Navbar from "@/components/HomeComponents/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after booking
import {
  useCheckAvailabilityQuery,
  useGetFacilityByIdQuery,
} from "@/redux/api";

const FacilityBooking = () => {
  const { id } = useParams(); // Get facility ID from URL
  const {
    data: facility,
    isLoading: isLoadingFacility,
    error: facilityError,
  } = useGetFacilityByIdQuery(id);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const navigate = useNavigate();

  // Fetch availability based on the selected date and facility ID
  const { data: availabilityData, isLoading: isLoadingAvailability } =
    useCheckAvailabilityQuery({
      date: selectedDate,
      facilityId: id,
    });

  // Handle errors and loading states
  if (isLoadingFacility) return <div>Loading facility details...</div>;
  if (facilityError || !facility)
    return <div>Error fetching facility details.</div>;

  const { name, location, pricePerHour, description, imageUrl } = facility.data;

  const checkAvailability = () => {
    // If availability data is fetched, update available slots
    if (availabilityData) {
      setAvailableSlots(availabilityData.slots);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleBooking = () => {
    // Handle booking logic (Add actual API call here)
    console.log("Booking details:", bookingDetails);

    // Navigate to confirmation or payment page after successful booking
    navigate(
      `/payment?facilityId=${id}&date=${bookingDetails.date}&startTime=${bookingDetails.startTime}&endTime=${bookingDetails.endTime}`
    );
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-10">
        {/* Facility Overview */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="text-gray-700 mb-2">{location}</p>
          <p className="text-gray-700 mb-4">{pricePerHour} per hour</p>
          <p className="text-gray-700">{description}</p>
        </section>

        {/* Availability Checker */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Check Availability</h2>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-4 md:mb-0 md:mr-4"
            />
            <button className="btn btn-primary" onClick={checkAvailability}>
              {isLoadingAvailability ? "Checking..." : "Check Availability"}
            </button>
          </div>
          <div className="mb-4">
            {availableSlots.length > 0 ? (
              <ul className="list-disc pl-5">
                {availableSlots.map((slot, index) => (
                  <li key={index} className="text-gray-700">
                    {slot}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">
                No available slots for the selected date.
              </p>
            )}
          </div>
        </section>

        {/* Booking Form */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Booking Details</h2>
          <form className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={bookingDetails.date}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, date: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="startTime"
                className="block text-sm font-bold mb-2"
              >
                Start Time
              </label>
              <input
                type="text"
                id="startTime"
                placeholder="Select start time"
                value={bookingDetails.startTime}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    startTime: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endTime" className="block text-sm font-bold mb-2">
                End Time
              </label>
              <input
                type="text"
                id="endTime"
                placeholder="Select end time"
                value={bookingDetails.endTime}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    endTime: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="button"
              className="btn btn-success w-full"
              onClick={handleBooking}
            >
              Proceed to Payment
            </button>
          </form>
        </section>

        {/* Payment Integration */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Payment Integration</h2>
          <p className="text-gray-700">
            Integrate with SSL Commerz/AmarPay for secure payment processing.
          </p>
        </section>

        {/* Confirmation */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Booking Confirmation</h2>
          <p className="text-gray-700">
            After successful booking, display a booking summary.
          </p>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default FacilityBooking;
