import React, { useState } from "react";

// Static JSON data for testimonials
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    feedback:
      "The booking process was seamless and the facility was top-notch. Will definitely book again!",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback:
      "Great experience! The website was easy to navigate, and the customer service was fantastic.",
    location: "London, UK",
  },
  {
    id: 3,
    name: "Carlos Garcia",
    feedback:
      "I found the perfect court for my weekend game. Highly recommended for all sports enthusiasts!",
    location: "Madrid, Spain",
  },
  // Add more testimonials as needed
];

const CustomerTestimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-12 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl font-black text-center mb-8 ">
          Customer <span className="text-blue-800"> Testimonials</span>
        </h2>
        <div className="relative p-8 rounded-2xl border border-slate-700">
          <div className="flex flex-col items-center">
            <p className="text-lg italic mb-4 text-center">
              "{testimonials[current].feedback}"
            </p>
            <h3 className="text-xl font-semibold">
              {testimonials[current].name}
            </h3>
            <p className="text-sm ">{testimonials[current].location}</p>
          </div>

          {/* Slider Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={handlePrev}
              className=" font-semibold text-xs rounded-full p-5"
            >
              &lt;
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={handleNext}
              className=" font-semibold text-xs rounded-full p-5"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;

// ** For Api
// import React, { useState, useEffect } from 'react';

// const CustomerTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     // Fetch testimonials from your API
//     fetch('https://your-api-url.com/testimonials')
//       .then(response => response.json())
//       .then(data => setTestimonials(data))
//       .catch(error => console.error('Error fetching testimonials:', error));
//   }, []);

//   // Remaining component code
// };
