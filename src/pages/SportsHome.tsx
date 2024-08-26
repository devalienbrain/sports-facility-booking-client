import Banner from "@/components/Banner";
import FeaturedItems from "@/components/FeaturedItems/FeaturedItems";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const SportsHome = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
      </div>
      <div>
        <Banner />
      </div>
      <div className="min-h-screen max-w-7xl mx-auto p-10">
        <FeaturedItems />
      </div>
      <div className="bg-violet-400 text-black">
        <div className="max-w-7xl mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default SportsHome;
