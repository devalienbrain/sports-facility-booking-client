export type TBooking = {
  _id: string; // Unique identifier for the booking
  userId: string; // ID of the user making the booking
  facilityId: string; // ID of the facility being booked
  facilityName: string; // Name of the facility being booked
  bookingDate: string; // Date of the booking (e.g., "YYYY-MM-DD")
  startTime: string; // Start time of the booking (e.g., "HH:mm")
  endTime: string; // End time of the booking (e.g., "HH:mm")
  totalPrice: number; // Total price for the booking
  status: "pending" | "confirmed" | "cancelled"; // Status of the booking
  createdAt: string; // Timestamp when the booking was created
  updatedAt: string; // Timestamp when the booking was last updated
};
