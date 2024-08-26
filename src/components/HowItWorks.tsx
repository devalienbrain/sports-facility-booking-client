import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up / Log In",
      description:
        "Create an account or log in to start booking your favorite sports facilities.",
      icon: "👤",
    },
    {
      id: 2,
      title: "Browse Facilities",
      description:
        "Explore the available sports facilities and choose the one that suits you best.",
      icon: "🏟️",
    },
    {
      id: 3,
      title: "Check Availability",
      description:
        "Select a date and check the availability of the facility you want to book.",
      icon: "📅",
    },
    {
      id: 4,
      title: "Book and Pay",
      description:
        "Fill in your booking details, complete the payment process, and secure your spot.",
      icon: "💳",
    },
    {
      id: 5,
      title: "Enjoy Your Game",
      description:
        "Head to the facility on the booked date and time, and enjoy your game!",
      icon: "⚽",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl bg-primary text-white rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
