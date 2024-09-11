import banner1 from "../../public/resources/banner1.jpg";
import banner2 from "../../public/resources/banner2.jpg";
import banner3 from "../../public/resources/banner3.jpg";
import banner4 from "../../public/resources/banner4.jpg";
import Navbar from "./Navbar";

const Banner = () => {
  return (
    <>
      <div className="carousel w-full relative">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img src={banner1} className="w-full" />

          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 text-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold md:font-black mb-4">
                Welcome to the Best Sports Facility
              </h2>
              <p className="mb-6 text-lg">
                Book your favorite sports facility easily and quickly.
              </p>
              <a
                href="#featuredItems"
                className="btn border-none bg-white/50 text-black hover:bg-white"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Ensure the Navbar is placed above everything else */}
          <div className="absolute top-0 w-full z-20">
            <Navbar />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-30">
            <a href="#slide4">❮</a>
            <a href="#slide2">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img src={banner2} className="w-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 text-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold md:font-black mb-4">
                Experience World-Class Facilities
              </h2>
              <p className="mb-6 text-lg">
                Get access to top-notch sports equipment and amenities.
              </p>
              <a
                href="#featuredItems"
                className="btn border-none bg-white/50 text-black hover:bg-white"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="absolute top-0 w-full z-20">
            <Navbar />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-30">
            <a href="#slide1">❮</a>
            <a href="#slide3">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img src={banner3} className="w-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 text-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold md:font-black mb-4">
                Easy Online Booking
              </h2>
              <p className="mb-6 text-lg">
                Choose your time and facility from the comfort of your home.
              </p>
              <a
                href="#featuredItems"
                className="btn border-none bg-white/50 text-black hover:bg-white"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="absolute top-0 w-full z-20">
            <Navbar />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-30">
            <a href="#slide2">❮</a>
            <a href="#slide4">❯</a>
          </div>
        </div>

        {/* Slide 4 */}
        <div id="slide4" className="carousel-item relative w-full">
          <img src={banner4} className="w-full" />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 text-white">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold md:font-black mb-4">
                Play, Compete, and Have Fun!
              </h2>
              <p className="mb-6 text-lg">
                Reserve your spot and enjoy a great time with friends.
              </p>
              <a
                href="#featuredItems"
                className="btn border-none bg-white/50 text-black hover:bg-white"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="absolute top-0 w-full z-20">
            <Navbar />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-30">
            <a href="#slide3">❮</a>
            <a href="#slide1">❯</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
