import React, { useState } from "react";

// Mock data for tips (You can replace this with dynamic data from an API)
const bookingTips = [
  {
    id: 1,
    title: "Plan Ahead",
    content:
      "Booking your facility in advance helps you secure your preferred time slot, especially during peak hours.",
  },
  {
    id: 2,
    title: "Check Availability Regularly",
    content:
      "Availability changes frequently. Keep checking to find the best slots and avoid last-minute hassles.",
  },
  {
    id: 3,
    title: "Consider Off-Peak Hours",
    content:
      "Booking during off-peak hours might provide you with better rates and more availability.",
  },
  {
    id: 4,
    title: "Read Reviews",
    content:
      "Check out other users' reviews and feedback to choose the best facility for your needs.",
  },
  {
    id: 5,
    title: "Stay Updated",
    content:
      "Subscribe to our newsletter or notifications to stay updated on special offers and new facility openings.",
  },
];

const BookingTipsRecommendations: React.FC = () => {
  const [showAllTips, setShowAllTips] = useState(false);

  const toggleTipsDisplay = () => {
    setShowAllTips(!showAllTips);
  };

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl font-black text-center mb-8">
          Booking <span className="text-blue-900">Tips & Recommendations</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookingTips
            .slice(0, showAllTips ? bookingTips.length : 3)
            .map((tip) => (
              <div
                key={tip.id}
                className="bg-black/10 rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-100">{tip.content}</p>
              </div>
            ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={toggleTipsDisplay}
            className="btn bg-white/50 text-black hover:bg-white"
          >
            {showAllTips ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingTipsRecommendations;
