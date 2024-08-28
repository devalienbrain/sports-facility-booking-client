import React, { useState } from "react";

// Mock data and logic for demonstration
const mockAvailableSlots = [
  "10:00 AM - 11:00 AM",
  "12:00 PM - 1:00 PM",
  "3:00 PM - 4:00 PM",
]; // Replace with actual available slots data

const FacilityBooking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const checkAvailability = () => {
    // Fetch availability based on selected date and facility (Add actual API call here)
    setAvailableSlots(mockAvailableSlots);
  };

  const handleBooking = () => {
    // Handle booking logic (Add actual API call here)
    console.log("Booking details:", bookingDetails);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Facility Overview */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Facility Overview</h2>
        <p className="text-gray-700 mb-2">Soccer Field A</p>
        <p className="text-gray-700 mb-4">City Center</p>
        <p className="text-gray-700">$50 per hour</p>
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
            Check Availability
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
            <label htmlFor="startTime" className="block text-sm font-bold mb-2">
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
  );
};

export default FacilityBooking;
