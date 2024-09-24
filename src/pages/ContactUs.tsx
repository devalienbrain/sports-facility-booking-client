import Footer from "@/components/HomeComponents/Footer";
import Navbar from "@/components/HomeComponents/Navbar";

const ContactUs = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-10">
        {/* Contact Form */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch</h2>
          <form className="w-full max-w-lg mx-auto bg-white text-red-500 shadow-md rounded-lg p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-bold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </section>

        {/* Optional Map Integration */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Location</h2>
          {/* Embed a Google Map iframe for map integration */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1310537109816!2d-122.08424948468118!3d37.422065379825085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24c2c2b3e4f%3A0x1749d18bd7ab0c12!2sGoogleplex!5e0!3m2!1sen!2sus!4v1625560836052!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>
        </section>

        {/* Contact Details */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Details</h2>
          <p className="text-lg text-gray-700">Phone: (123) 456-7890</p>
          <p className="text-lg text-gray-700">
            Email: contact@sportsfacility.com
          </p>
          <p className="text-lg text-gray-700">
            Address: 123 Sports Lane, Cityville
          </p>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
