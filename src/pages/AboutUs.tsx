import Footer from "@/components/HomeComponents/Footer";
import Navbar from "@/components/HomeComponents/Navbar";
import img1 from "../../public/resources/DrFatiha.png";
import img2 from "../../public/resources/alienDev.jpg";
const AboutUs = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-10 w-3/4">
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
          <div className="flex flex-col items-center justify-center flex-wrap">
            {/* Example Team Member */}
            <div className="w-full p-4">
              <div className="card shadow-lg">
                <h3 className="font-bold text-xl text-center text-blue-600">
                  Dr. Fati Loo
                </h3>
                <figure>
                  <img
                    src={img1}
                    alt="Team Member"
                    className="rounded-t-lg w-36 rounded-full"
                  />
                </figure>
                <div className="card-body text-center">
                  <p className="text-sm text-gray-400 text-center font-semibold">
                    CEO & Founder
                  </p>
                  <p className="mt-2 text-gray-700">
                    Suu has over 10 years of experience in sports management and
                    is passionate about making sports facilities more
                    accessible.
                  </p>
                </div>
              </div>
            </div>
            {/* Add more team members as needed */}
            <div className="w-full p-4">
              <div className="card shadow-lg">
                <h3 className="font-bold text-xl text-center text-blue-600">
                  Engr Alien Dev
                </h3>

                <figure>
                  <img
                    src={img2}
                    alt="Team Member"
                    className="rounded-t-lg w-36 rounded-full"
                  />
                </figure>
                <div className="card-body text-center">
                  <p className="text-sm text-gray-400 text-center font-semibold">
                    Tech Specialist & Founder
                  </p>
                  <p className="mt-2 text-gray-700">
                    Dev has over 10 years of experience in sports management
                    platform and is passionate about making sports facilities
                    platform more accessible and user friendly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History & Milestones */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Journey</h2>
          <h4 className="font-semibold text-center">
            2023 - Platform Launched
          </h4>
          <p className="text-gray-700 text-center">
            We launched our platform to provide an easy way for people to book
            sports facilities online.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <div className="text-center">
            <p className="text-lg text-gray-700">
              Office Address: 123 Sports Lane, Gulshan, Dhaka, Bangladesh
            </p>
            <p className="text-lg text-gray-700">Phone: (+880) 1893-070812</p>
            <p className="text-lg text-gray-700">
              Email: contactFatihaSabbir@sportsfacility.com
            </p>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
