import React, { useState } from "react";

// Mock data for FAQs (Replace this with dynamic data from an API if needed)
const faqs = [
  {
    id: 1,
    question: "How do I book a facility?",
    answer:
      "To book a facility, simply navigate to the 'Facility Listing' page, choose your preferred facility, and click the 'Book Now' button. You will be guided through the booking process step-by-step.",
  },
  {
    id: 2,
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking from your user dashboard. Go to 'My Bookings' and select the booking you wish to change. Please note that modifications and cancellations are subject to our terms and conditions.",
  },
  {
    id: 3,
    question: "What payment methods are accepted?",
    answer:
      "We accept a variety of payment methods including credit/debit cards and online payment systems like SSL Commerz and AmarPay. All transactions are secure and encrypted.",
  },
  {
    id: 4,
    question: "Are there any discounts for group bookings?",
    answer:
      "Yes, we offer discounts for group bookings and recurring reservations. Please contact our support team for more details on group booking discounts.",
  },
  {
    id: 5,
    question: "How do I become an admin?",
    answer:
      "Admins are appointed by our organization based on certain criteria. If you are interested in becoming an admin, please contact our support team for more information.",
  },
];

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl font-black text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md p-4">
              <button
                className="w-full text-left flex justify-between items-center"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span
                  className={`text-gray-500 ${
                    openFAQ === faq.id ? "rotate-180" : ""
                  } transform transition-transform`}
                >
                  ▼
                </span>
              </button>
              {openFAQ === faq.id && (
                <div className="mt-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
