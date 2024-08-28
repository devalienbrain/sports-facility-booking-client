import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Mission Statement */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-center text-gray-700">
          At Sports Facility Booking Platform, our mission is to provide a
          seamless and user-friendly experience for booking sports facilities,
          making sports more accessible and enjoyable for everyone.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Team</h2>
        <div className="flex flex-wrap justify-center">
          {/* Example Team Member */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="card shadow-lg">
              <figure>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="rounded-t-lg w-full"
                />
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title">John Doe</h3>
                <p className="text-sm text-gray-600">CEO & Founder</p>
                <p className="mt-2 text-gray-700">
                  John has over 10 years of experience in sports management and
                  is passionate about making sports facilities more accessible.
                </p>
              </div>
            </div>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* History & Milestones */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Journey</h2>
        <div className="timeline">
          {/* Example Milestone */}
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4 className="font-semibold">2023 - Platform Launched</h4>
              <p className="text-gray-700">
                We launched our platform to provide an easy way for people to
                book sports facilities online.
              </p>
            </div>
          </div>
          {/* Add more milestones as needed */}
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <div className="text-center">
          <p className="text-lg text-gray-700">
            Office Address: 123 Sports Lane, Cityville
          </p>
          <p className="text-lg text-gray-700">Phone: (123) 456-7890</p>
          <p className="text-lg text-gray-700">
            Email: contact@sportsfacility.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
