// import { useParams } from "react-router-dom";
// import Footer from "@/components/HomeComponents/Footer";
// import Navbar from "@/components/HomeComponents/Navbar";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCheckAvailabilityQuery,
//   useGetFacilityByIdQuery,
//   useCreateBookingMutation, // Add this to use the booking mutation
// } from "@/redux/api";

// const FacilityBooking = () => {
//   const { id } = useParams(); // Get facility ID from URL
//   const {
//     data: facility,
//     isLoading: isLoadingFacility,
//     error: facilityError,
//   } = useGetFacilityByIdQuery(id);

//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date();
//     return today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
//   });

//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [bookingDetails, setBookingDetails] = useState({
//     date: selectedDate,
//     startTime: "",
//     endTime: "",
//   });

//   const [createBooking] = useCreateBookingMutation(); // Use the booking mutation

//   const navigate = useNavigate();

//   // Fetch availability based on the selected date and facility ID
//   const { data: availabilityData, isLoading: isLoadingAvailability } =
//     useCheckAvailabilityQuery({
//       date: selectedDate,
//       facilityId: id,
//     });

//   useEffect(() => {
//     if (availabilityData && availabilityData.data?.length > 0) {
//       setAvailableSlots(availabilityData.data);
//     } else {
//       setAvailableSlots([]); // No available slots for the selected date
//     }
//   }, [availabilityData]);

//   // Automatically set booking date when date is selected
//   useEffect(() => {
//     setBookingDetails((prevDetails) => ({
//       ...prevDetails,
//       date: selectedDate,
//     }));
//   }, [selectedDate]);

//   const handleBooking = async () => {
//     try {
//       const bookingPayload = {
//         facility: id, // The facility ID
//         date: bookingDetails.date,
//         startTime: bookingDetails.startTime,
//         endTime: bookingDetails.endTime,
//       };

//       // Call the mutation to create a new booking
//       const response = await createBooking(bookingPayload).unwrap();
//       console.log(response);
//       alert(`${response?.message}`);
//       // Navigate to payment or confirmation page after successful booking
//       // navigate(
//       //   `/payment?facilityId=${id}&date=${bookingDetails.date}&startTime=${bookingDetails.startTime}&endTime=${bookingDetails.endTime}`
//       // );
//     } catch (error) {
//       console.error("Error creating booking:", error);
//       // Handle error appropriately (e.g., show error message to user)
//     }
//   };

//   if (isLoadingFacility) return <div>Loading facility details...</div>;
//   if (facilityError || !facility)
//     return <div>Error fetching facility details.</div>;

//   const { name, location, pricePerHour, description } = facility.data;

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div className="container mx-auto py-10 flex justify-center items-center">
//         <div>
//           <h1 className="font-extrabold text-3xl pb-7 text-red-600">
//             Book A Facility
//           </h1>
//           <hr />

//           {/* Facility Overview */}
//           <section className="mb-8 border rounded-xl p-3 mt-7">
//             <h2 className="text-3xl font-bold mb-4">{name}</h2>
//             <p className="text-gray-700 mb-2">{location}</p>
//             <p className="text-gray-700 mb-4 font-bold">
//               {pricePerHour}$ per hour
//             </p>
//             <p className="text-gray-700">{description}</p>
//           </section>

//           {/* Availability Checker */}
//           <section className="mb-8">
//             <h2 className="text-3xl font-bold mb-4">Check Availability</h2>
//             <div className="flex flex-col md:flex-row items-center mb-4">
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="input input-bordered w-full max-w-xs mb-4 md:mb-0 md:mr-4"
//               />
//               <button className="btn btn-primary">
//                 {isLoadingAvailability ? "Checking..." : "Check Availability"}
//               </button>
//             </div>
//             <div className="mb-4">
//               {availableSlots.length > 0 ? (
//                 <>
//                   <p className="text-gray-700">
//                     Available slots for the selected date:
//                   </p>
//                   <ul className="list-disc pl-5">
//                     {availableSlots.map((slot, index) => (
//                       <li key={index} className="text-gray-700">
//                         {slot.startTime} - {slot.endTime}
//                       </li>
//                     ))}
//                   </ul>{" "}
//                 </>
//               ) : (
//                 <p className="text-gray-700">
//                   No available slots for the selected date.
//                 </p>
//               )}
//             </div>
//           </section>

//           {/* Booking Form */}
//           <section className="mb-8">
//             <h2 className="text-3xl font-bold mb-4">Booking Details</h2>
//             <form className="w-full max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
//               <div className="mb-4">
//                 <label htmlFor="date" className="block text-sm font-bold mb-2">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   value={bookingDetails.date}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingDetails,
//                       date: e.target.value,
//                     })
//                   }
//                   className="input input-bordered w-full"
//                   readOnly // The booking date is auto-set from availability check
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="startTime"
//                   className="block text-sm font-bold mb-2"
//                 >
//                   Start Time
//                 </label>
//                 <select
//                   id="startTime"
//                   value={bookingDetails.startTime}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingDetails,
//                       startTime: e.target.value,
//                     })
//                   }
//                   className="input input-bordered w-full"
//                 >
//                   <option value="" disabled>
//                     Select start time
//                   </option>
//                   {availableSlots.map((slot, index) => (
//                     <option key={index} value={slot.startTime}>
//                       {slot.startTime}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="endTime"
//                   className="block text-sm font-bold mb-2"
//                 >
//                   End Time
//                 </label>
//                 <select
//                   id="endTime"
//                   value={bookingDetails.endTime}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingDetails,
//                       endTime: e.target.value,
//                     })
//                   }
//                   className="input input-bordered w-full"
//                 >
//                   <option value="" disabled>
//                     Select end time
//                   </option>
//                   {availableSlots.map((slot, index) => (
//                     <option key={index} value={slot.endTime}>
//                       {slot.endTime}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-success w-full"
//                 onClick={handleBooking}
//               >
//                 Confirm Booking
//               </button>
//             </form>
//           </section>
//         </div>
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default FacilityBooking;

import { Navigate, useParams } from "react-router-dom";
import Footer from "@/components/HomeComponents/Footer";
import Navbar from "@/components/HomeComponents/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Import your root state for useSelector
import {
  useCheckAvailabilityQuery,
  useGetFacilityByIdQuery,
  useCreateBookingMutation,
} from "@/redux/api";

const FacilityBooking = () => {
  const { id } = useParams(); // Get facility ID from URL
  const navigate = useNavigate();

  const {
    data: facility,
    isLoading: isLoadingFacility,
    error: facilityError,
  } = useGetFacilityByIdQuery(id);

  const user = useSelector((state: RootState) => state.user.user); // Check user authentication

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    date: selectedDate,
    startTime: "",
    endTime: "",
  });

  const [createBooking] = useCreateBookingMutation(); // Use the booking mutation

  // Fetch availability based on the selected date and facility ID
  const { data: availabilityData, isLoading: isLoadingAvailability } =
    useCheckAvailabilityQuery({
      date: selectedDate,
      facilityId: id,
    });

  useEffect(() => {
    if (availabilityData && availabilityData.data?.length > 0) {
      setAvailableSlots(availabilityData.data);
    } else {
      setAvailableSlots([]); // No available slots for the selected date
    }
  }, [availabilityData]);

  // Automatically set booking date when date is selected
  useEffect(() => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      date: selectedDate,
    }));
  }, [selectedDate]);

  // Handle booking submission
  const handleBooking = async () => {
    // Check if the user is logged in
    if (!user) {
      // alert("Please log in to make a booking.");
      // Redirect to login page with a redirect URL to come back after login
      navigate(`/login?redirect=/facility/${id}/book`);
      return;
    }

    // Validate start and end times
    if (!bookingDetails.startTime || !bookingDetails.endTime) {
      alert("Please select both start and end times.");
      return;
    }

    if (bookingDetails.endTime <= bookingDetails.startTime) {
      alert("End time must be after the start time.");
      return;
    }

    try {
      const bookingPayload = {
        facility: id, // The facility ID
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
      };

      // Call the mutation to create a new booking
      const response = await createBooking(bookingPayload).unwrap();
      console.log(response);
      alert(`${response?.message}`);

      navigate(`/dashboard/checkoutForPayment`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
    }
  };

  if (isLoadingFacility) return <div>Loading facility details...</div>;
  if (facilityError || !facility)
    return <div>Error fetching facility details.</div>;

  const { name, location, pricePerHour, description } = facility.data;

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto py-10 flex justify-center items-center">
        <div>
          <h1 className="font-extrabold text-3xl pb-7 text-red-600">
            Book A Facility
          </h1>
          <hr />

          {/* Facility Overview */}
          <section className="mb-8 border rounded-xl p-3 mt-7">
            <h2 className="text-3xl font-bold mb-4">{name}</h2>
            <p className="text-gray-700 mb-2">{location}</p>
            <p className="text-gray-700 mb-4 font-bold">
              {pricePerHour}$ per hour
            </p>
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
              <button className="btn btn-primary">
                {isLoadingAvailability ? "Checking..." : "Check Availability"}
              </button>
            </div>
            <div className="mb-4">
              {availableSlots.length > 0 ? (
                <>
                  <p className="text-gray-700">
                    Available slots for the selected date:
                  </p>
                  <ul className="list-disc pl-5">
                    {availableSlots.map((slot, index) => (
                      <li key={index} className="text-gray-700">
                        {slot.startTime} - {slot.endTime}
                      </li>
                    ))}
                  </ul>{" "}
                </>
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
            <form className="w-full max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={bookingDetails.date}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                  readOnly // The booking date is auto-set from availability check
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block text-sm font-bold mb-2"
                >
                  Start Time
                </label>
                <select
                  id="startTime"
                  value={bookingDetails.startTime}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      startTime: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                >
                  <option value="" disabled>
                    Select start time
                  </option>
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot.startTime}>
                      {slot.startTime}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-sm font-bold mb-2"
                >
                  End Time
                </label>
                <select
                  id="endTime"
                  value={bookingDetails.endTime}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingDetails,
                      endTime: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                >
                  <option value="" disabled>
                    Select end time
                  </option>
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot.endTime}>
                      {slot.endTime}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-success w-full"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
            </form>
          </section>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default FacilityBooking;
