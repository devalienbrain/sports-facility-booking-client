import {
  useCheckAvailabilityQuery,
  useCreateBookingMutation,
} from "@/redux/api";
import React, { useState } from "react";

const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Fetch available slots using the RTK Query hook
  const { data: availableSlots = [], refetch } = useCheckAvailabilityQuery(
    { date: selectedDate, facility: "" }, // Replace with actual facility ID if needed
    { skip: !selectedDate } // Skip the query if no date is selected
  );

  // Mutation hook for creating a booking
  const [createBooking] = useCreateBookingMutation();

  const handleCheckAvailability = () => {
    refetch();
  };

  const handleBooking = async () => {
    if (selectedSlot) {
      await createBooking({ date: selectedDate, slot: selectedSlot }).unwrap();
      alert("Booking Successful!");
    } else {
      alert("Please select a slot.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Book a Facility</h1>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-white"
        />
      </div>
      <button
        onClick={handleCheckAvailability}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Check Availability
      </button>
      {availableSlots.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
          <div className="flex flex-wrap gap-4">
            {availableSlots.map((slot: any) => (
              <button
                key={slot.startTime}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded ${
                  selectedSlot === slot ? "bg-green-500" : "bg-gray-200"
                } hover:bg-gray-300`}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleBooking}
        disabled={!selectedSlot}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
