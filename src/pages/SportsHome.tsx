import Banner from "@/components/Banner";
import BookingTipsRecommendations from "@/components/BookingTipsRecommendations";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import FAQSection from "@/components/FAQSection";
import FeaturedItems from "@/components/FeaturedItems/FeaturedItems";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTop";

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
        <div className="py-16">
          <FeaturedItems />
        </div>
        <div className="py-16">
          <HowItWorks />
        </div>
        <div className="py-16">
          <CustomerTestimonials />
        </div>
        {/* <div className="py-16">
          <TopTrendingFacilities />
        </div> */}
        <div className="py-16">
          <BookingTipsRecommendations />
        </div>
        <div className="py-16">
          <FAQSection />
        </div>
      </div>
      <div className="bg-violet-400 text-black">
        <div className="max-w-7xl mx-auto">
          <Footer />
        </div>
      </div>
      <ScrollToTopButton /> 
    </>
  );
};

export default SportsHome;
